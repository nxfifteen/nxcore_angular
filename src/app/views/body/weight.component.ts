import {Component, OnInit} from '@angular/core';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {ApiService} from '../../services/api.service';
import {MarkdownService} from 'ngx-markdown';

@Component({
  templateUrl: './weight.component.html'
})
export class WeightComponent implements OnInit {
  weightWidgetWidgetChartSince: string;
  weightWidgetWidgetChartOptions: any;
  weightWidgetWidgetChartColours: any;
  weightWidgetWidgetChartLegend: boolean;
  weightWidgetWidgetChartType: string;
  // noinspection JSMismatchedCollectionQueryUpdate
  weightWidgetWidgetChartData: Array<any>;
  // noinspection JSMismatchedCollectionQueryUpdate
  weightWidgetWidgetChartLabels: Array<any>;

  constructor(private markdownService: MarkdownService, private apiService: ApiService) {
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
    this.apiService.getFitBodyWeight().subscribe((data) => {
      // console.log(data);

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
              min: (data['weight']['goal'] - 1)
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
  }

}
