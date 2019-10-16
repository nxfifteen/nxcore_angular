import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MarkdownService} from 'ngx-markdown';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_services';
import {User} from '../../_models';
import {MatomoService} from '../../services/matomo.service';
import {ActivityLog, ActivityLogNav} from '../../_models/activityLog';
import {hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';

@Component({
  templateUrl: './activity_log_details.component.html'
})
export class ActivityLogDetailsComponent implements OnInit {
  loading: number;
  loadingExpected: number;

  currentUser: User;

  activityId: number;
  loggedActivity: ActivityLog;
  loggedActivityName: string;
  activityLogsNav: ActivityLogNav;

  gridImpactRow: string = 'col-4';
  gridStatRow: string = 'col-4';

  pageTitle: string = 'Core | Activities';

  // distanceChart
  public distanceChartData1: Array<number> = [];
  public distanceChartData: Array<any> = [
    {
      data: this.distanceChartData1,
      label: 'Current'
    }
  ];
  /* tslint:disable:max-line-length */
  public distanceChartLabels: Array<any> = [];

  /* tslint:enable:max-line-length */
  public distanceChartOptions: any = {
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
        },
        ticks: {
          beginAtZero: false,
          maxTicksLimit: 5,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(120 / 5),
          max: 120
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
      display: false
    }
  };
  public distanceChartColours: Array<any> = [
    { // brandSuccess
      backgroundColor: hexToRgba('#20a8d8', 10),
      borderColor: '#20a8d8',
      pointHoverBackgroundColor: '#fff'
    },
  ];
  public distanceChartLegend = false;
  public distanceChartType = 'line';

  // speedChart
  public speedChartData1: Array<number> = [];
  public speedChartData: Array<any> = [
    {
      data: this.speedChartData1,
      label: 'Current'
    }
  ];
  /* tslint:disable:max-line-length */
  public speedChartLabels: Array<any> = [];

  /* tslint:enable:max-line-length */
  public speedChartOptions: any = {
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
        },
        ticks: {
          beginAtZero: false,
          maxTicksLimit: 5,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(120 / 5),
          max: 120
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
      display: false
    }
  };
  public speedChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba('#4dbd74', 10),
      borderColor: '#4dbd74',
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public speedChartLegend = false;
  public speedChartType = 'line';

  // heartChart
  public heartChartData1: Array<number> = [];
  public heartChartData: Array<any> = [
    {
      data: this.heartChartData1,
      label: 'Current'
    }
  ];
  /* tslint:disable:max-line-length */
  public heartChartLabels: Array<any> = [];

  /* tslint:enable:max-line-length */
  public heartChartOptions: any = {
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
        },
        ticks: {
          beginAtZero: false,
          maxTicksLimit: 5,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(120 / 5),
          max: 120
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
      display: false
    }
  };
  public heartChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba('#f86c6b', 10),
      borderColor: '#f86c6b',
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public heartChartLegend = false;
  public heartChartType = 'line';

  // altitudeChart
  public altitudeChartData1: Array<number> = [];
  public altitudeChartData: Array<any> = [
    {
      data: this.altitudeChartData1,
      label: 'Current'
    }
  ];
  /* tslint:disable:max-line-length */
  public altitudeChartLabels: Array<any> = [];

  /* tslint:enable:max-line-length */
  public altitudeChartOptions: any = {
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
        },
        ticks: {
          beginAtZero: false,
          maxTicksLimit: 5,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(120 / 5),
          max: 120
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
      display: false
    }
  };
  public altitudeChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba('#f86c6b', 10),
      borderColor: '#f86c6b',
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public altitudeChartLegend = false;
  public altitudeChartType = 'line';

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private markdownService: MarkdownService,
              private apiService: ApiService,
              private _ActivatedRoute: ActivatedRoute,
              private _matomoService: MatomoService
  ) {
    this.loading = 0;
    this.loadingExpected = 1;
    this.loggedActivityName = 'Details';
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (this.currentUser.firstrun) {
      this.router.navigate(['/onboarding']);
    } else {
      this._matomoService.setupTracking(this.pageTitle);
      this._matomoService.setCustomVariable('apiCalls', this.loadingExpected.toString(), 'page');
      this._ActivatedRoute.paramMap.subscribe(params => {
        // tslint:disable-next-line:radix
        this.activityId = parseInt(params.get('id'));
      });
      this.loadFromApi();
    }
  }

  pullToRefresh(): void {
    this._matomoService.trackEvent('core', 'api', 'cache', 0);
    this.buildViewContent(this.activityId, true);
  }

  loadFromApi(): void {
    this._matomoService.trackEvent('core', 'api', 'cache', 1);
    this.buildViewContent(this.activityId, false);
  }

  buildViewContent(activityId: any, bustCache?: boolean) {
    this.loading = 0;
    this.speedChartLabels = [];
    this.speedChartData1 = [];
    this.speedChartData = [
      {
        data: this.speedChartData1,
        label: 'Current'
      }
    ];
    this.altitudeChartLabels = [];
    this.altitudeChartData1 = [];
    this.altitudeChartData = [
      {
        data: this.altitudeChartData1,
        label: 'Current'
      }
    ];
    this.distanceChartLabels = [];
    this.distanceChartData1 = [];
    this.distanceChartData = [
      {
        data: this.distanceChartData1,
        label: 'Current'
      }
    ];
    this.heartChartLabels = [];
    this.heartChartData1 = [];
    this.heartChartData = [
      {
        data: this.heartChartData1,
        label: 'Current'
      }
    ];

    this.apiService.getActivitiesLogDetails(activityId, bustCache).subscribe((data) => {
      this.loggedActivity = data['results'];
      this.activityLogsNav = data['nav'];
      this.loggedActivityName = this.loggedActivity.dateFormatted + ' - ' + this.loggedActivity.exerciseType;

      let impactRowItems = 0;
      if (this.loggedActivity.steps > 0) {
        impactRowItems++;
      }
      if (this.loggedActivity.calorie > 0) {
        impactRowItems++;
      }
      if (this.loggedActivity.duration > 0) {
        impactRowItems++;
      }
      this.gridImpactRow = this.calcGridSize(impactRowItems);

      let statRowItems = 0;
      if (this.loggedActivity.heartRateMean > 0) {
        statRowItems++;
      }
      if (this.loggedActivity.speedMean > 0) {
        statRowItems++;
      }
      if (this.loggedActivity.altitudeMin > 0) {
        statRowItems++;
      }
      this.gridStatRow = this.calcGridSize(statRowItems);

      console.log(data['results']['liveData'].length);
      console.log(data['results']['liveData']);

      if (typeof data['results']['liveData']['distance'] !== 'undefined' && data['results']['liveData']['distance'].length > 0) {
        for (let i = 0; i < data['results']['liveData']['distance'].length; i++) {
          this.distanceChartLabels.push(data['results']['liveData']['distance'][i]['timestamp']);
          this.distanceChartData1.push(data['results']['liveData']['distance'][i]['value']);
        }
        this.distanceChartOptions.scales.yAxes[0].ticks.max = data['results']['maxDistance'];
        this.distanceChartOptions.scales.yAxes[0].ticks.min = 0;
      }

      if (typeof data['results']['liveData']['speed'] !== 'undefined' && data['results']['liveData']['speed'].length > 0) {
        for (let i = 0; i < data['results']['liveData']['speed'].length; i++) {
          this.speedChartLabels.push(data['results']['liveData']['speed'][i]['timestamp']);
          this.speedChartData1.push(data['results']['liveData']['speed'][i]['value']);
        }
        this.speedChartOptions.scales.yAxes[0].ticks.max = data['results']['maxSpeed'];
        this.speedChartOptions.scales.yAxes[0].ticks.min = 0;
      }

      if (typeof data['results']['liveData']['heart_rate'] !== 'undefined' && data['results']['liveData']['heart_rate'].length > 0) {
        for (let i = 0; i < data['results']['liveData']['heart_rate'].length; i++) {
          this.heartChartLabels.push(data['results']['liveData']['heart_rate'][i]['timestamp']);
          this.heartChartData1.push(data['results']['liveData']['heart_rate'][i]['value']);
        }
        this.heartChartOptions.scales.yAxes[0].ticks.max = data['results']['maxHeart'];
        this.heartChartOptions.scales.yAxes[0].ticks.min = 0;
      }

      if (typeof data['results']['liveData']['altitude'] !== 'undefined' && data['results']['liveData']['altitude'].length > 0) {
        for (let i = 0; i < data['results']['liveData']['altitude'].length; i++) {
          this.altitudeChartLabels.push(data['results']['liveData']['altitude'][i]['timestamp']);
          this.altitudeChartData1.push(data['results']['liveData']['altitude'][i]['value']);
        }
        this.altitudeChartOptions.scales.yAxes[0].ticks.max = data['results']['maxAltitude'];
        this.altitudeChartOptions.scales.yAxes[0].ticks.min = 0;
      }

      console.log(this.distanceChartData1.length);
      console.log(this.speedChartData1.length);
      console.log(this.heartChartData1.length);
      console.log(this.altitudeChartData1.length);

      this.emitApiLoaded();
    });
  }

  private emitApiLoaded() {
    this.loading++;
    if (this.loading >= this.loadingExpected) {
      this._matomoService.doTracking(-1, this.pageTitle + ' | ' + this.loggedActivityName);
    }
  }

  calcGridSize(rowItems: number) {
    switch (rowItems) {
      case 1:
        return 'col-12';
      case 2:
        return 'col-12 col-md-6';
      case 3:
        return 'col-12 col-md-4';
      case 4:
        return 'col-12 col-md-3';
    }
  }
}
