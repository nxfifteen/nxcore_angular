import {Component, OnInit} from '@angular/core';
import {getStyle} from '@coreui/coreui/dist/js/coreui-utilities';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {ApiService} from '../../services/api.service';
import {MarkdownService} from 'ngx-markdown';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_services';
import {User} from '../../_models';
import {MatomoService} from '../../services/matomo.service';

@Component({
  templateUrl: './weight.component.html'
})
export class WeightComponent implements OnInit {
  loading: number;
  loadingExpected: number;
  weightWidgetWidgetChartSince: string;
  weightWidgetWidgetChartOptions: any;
  weightWidgetWidgetChartColours: any;
  weightWidgetWidgetChartLegend: boolean;
  weightWidgetWidgetChartType: string;
  // noinspection JSMismatchedCollectionQueryUpdate
  weightWidgetWidgetChartData: Array<any>;
  // noinspection JSMismatchedCollectionQueryUpdate
  weightWidgetWidgetChartLabels: Array<any>;
  currentUser: User;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private markdownService: MarkdownService,
              private apiService: ApiService,
              private _matomoService: MatomoService
  ) {
    this.loading = 0;
    this.loadingExpected = 1;

    this.weightWidgetWidgetChartData = [
      {
        data: [0],
        label: 'Loading'
      }
    ];
    this.weightWidgetWidgetChartLabels = ['Loading'];
    this.weightWidgetWidgetChartOptions = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips,
        intersect: true,
        mode: 'index',
        position: 'nearest',
        callbacks: {
          labelColor: function (tooltipItem, chart) {
            return {backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor};
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          gridLines: {
            drawOnChartArea: false,
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: false,
            maxTicksLimit: 5,
            max: 1,
            min: 0
          }
        }]
      },
      elements: {
        line: {
          borderWidth: 2
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        }
      },
      legend: {
        display: true
      }
    };
    this.weightWidgetWidgetChartColours = [
      { // brandInfo
        backgroundColor: 'transparent',
        borderColor: getStyle('--info'),
        pointHoverBackgroundColor: '#fff'
      },
      { // brandSuccess
        backgroundColor: 'transparent',
        borderColor: getStyle('--success'),
        pointHoverBackgroundColor: '#fff'
      },
      { // brandSuccess
        backgroundColor: 'transparent',
        borderColor: getStyle('--warning'),
        pointHoverBackgroundColor: '#fff'
      }
    ];
    this.weightWidgetWidgetChartLegend = true;
    this.weightWidgetWidgetChartType = 'line';
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (this.currentUser.firstrun) {
      this.router.navigate(['/onboarding']);
    } else {
      this._matomoService.setupTracking('Core | Body | Weight');
      this._matomoService.setCustomVariable('apiCalls', this.loadingExpected.toString(), 'page');
      this.loadFromApi();
    }
  }

  pullToRefresh(): void {
    this._matomoService.trackEvent('core', 'api', 'cache', 0);
    this.buildViewContent(true);
  }

  loadFromApi(): void {
    this._matomoService.trackEvent('core', 'api', 'cache', 1);
    this.buildViewContent(false);
  }

  buildViewContent(bustCache?: boolean): void {
    this.loading = 0;

    this.apiService.getFitBodyWeight(bustCache).subscribe((data) => {
      this.weightWidgetWidgetChartSince = data['weight']['since'];
      this.weightWidgetWidgetChartData = [];
      for (let i = 0; i < data['weight']['widget']['data'].length; i++) {
        this.weightWidgetWidgetChartData.push(data['weight']['widget']['data'][i]);
      }
      this.weightWidgetWidgetChartLabels = data['weight']['widget']['labels'];
      this.weightWidgetWidgetChartOptions.scales.yAxes[0].ticks.max = 100;
      this.weightWidgetWidgetChartOptions.scales.yAxes[0].ticks.min = 0;

      this.weightWidgetWidgetChartOptions = {
        tooltips: {
          enabled: false,
          custom: CustomTooltips,
          intersect: true,
          mode: 'index',
          position: 'nearest',
          callbacks: {
            labelColor: function (tooltipItem, chart) {
              return {backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor};
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false,
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: false,
              maxTicksLimit: 5,
              max: data['weight']['widget']['axis']['max'],
              min: (data['weight']['widget']['axis']['min'] - 1)
            }
          }]
        },
        elements: {
          line: {
            borderWidth: 2
          },
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
          }
        },
        legend: {
          display: true
        }
      };
    });

    this.emitApiLoaded();
  }

  private emitApiLoaded() {
    this.loading++;
    if (this.loading >= this.loadingExpected) {
      this._matomoService.doTracking();
    }
  }

}
