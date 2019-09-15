import {Component, OnInit} from '@angular/core';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {ApiService} from '../../services/api.service';
import {faHiking, faShoePrints, faWalking} from '@fortawesome/free-solid-svg-icons';
import {MarkdownService} from 'ngx-markdown';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  stepSummary: number;
  stepSummaryGoal: number;
  stepSummaryPercentage: number;
  floorsSummary: number;
  floorsSummaryGoal: number;
  floorsSummaryPercentage: number;
  distanceSummary: number;
  distanceSummaryGoal: number;
  distanceSummaryPercentage: number;
  showPush: boolean;
  showJourney: boolean;
  faWalking = faWalking;
  faHiking = faHiking;
  faShoePrints = faShoePrints;
  showBestDay: boolean;
  showStreak: boolean;
  summaryWidgetChartOptions: any;
  summaryWidgetChartColours: any;
  summaryWidgetChartLegend: boolean;
  summaryWidgetChartType: string;
  intraDayWidgetChartOptions: any;
  intraDayWidgetChartColours: any;
  intraDayWidgetChartLegend: boolean;
  intraDayWidgetChartType: string;
  // noinspection JSMismatchedCollectionQueryUpdate
  stepSummaryChartData: Array<any>;
  // noinspection JSMismatchedCollectionQueryUpdate
  stepSummaryChartLabels: Array<any>;
  // noinspection JSMismatchedCollectionQueryUpdate
  distanceSummaryChartData: Array<any>;
  // noinspection JSMismatchedCollectionQueryUpdate
  distanceSummaryChartLabels: Array<any>;
  // noinspection JSMismatchedCollectionQueryUpdate
  floorIntraDayChartData: Array<any>;
  // noinspection JSMismatchedCollectionQueryUpdate
  floorIntraDayChartLabels: Array<any>;
  // noinspection JSMismatchedCollectionQueryUpdate
  stepIntraDayChartData: Array<any>;
  // noinspection JSMismatchedCollectionQueryUpdate
  stepIntraDayChartLabels: Array<any>;

  weightWidgetChartOptions: any;
  weightWidgetChartColours: any;
  weightWidgetChartLegend: boolean;
  weightWidgetChartType: string;
  // noinspection JSMismatchedCollectionQueryUpdate
  weightWidgetChartData: Array<any>;
  // noinspection JSMismatchedCollectionQueryUpdate
  weightWidgetChartLabels: Array<any>;
  // noinspection JSMismatchedCollectionQueryUpdate
  exerciseWidgetChartData: Array<any>;
  // noinspection JSMismatchedCollectionQueryUpdate
  exerciseWidgetChartLabels: Array<any>;
  weightCurrent: number;
  weightCurrentUnit: string;
  weightPercentage: number;
  fatCurrent: number;
  fatCurrentUnit: string;
  fatPercentage: number;
  theBest: string[] = [];
  theMilestonesMore: string[] = [];
  theMilestonesLess: string[] = [];
  weightWidgetChartSince: string;
  exerciseWidgetChartOptions: any;
  exerciseHistory: string[] = [];
  exerciseWidgetChartColours: any;
  exerciseWidgetChartLegend: boolean;
  exerciseWidgetChartType: string;
  profileName: string;
  profileAvatar: string;
  profileXp: number;
  profileXpLog: Array<any>;
  profileXpProgress: number;
  profileXpTarget: number;
  profileAwards: Array<any>;
  profileLevel: string;

  constructor(private router: Router,
              private markdownService: MarkdownService,
              private apiService: ApiService) {
    this.stepSummaryChartData = [
      {
        data: [0],
        label: 'Loading'
      }
    ];
    this.stepSummaryChartLabels = ['Loading'];

    // this.floorSummaryChartData = this.stepSummaryChartData;
    // this.floorSummaryChartLabels = this.stepSummaryChartLabels;
    this.floorIntraDayChartData = this.stepSummaryChartData;
    this.floorIntraDayChartLabels = this.stepSummaryChartLabels;
    this.stepIntraDayChartData = this.stepSummaryChartData;
    this.stepIntraDayChartLabels = this.stepSummaryChartLabels;
    this.distanceSummaryChartData = this.stepSummaryChartData;
    this.distanceSummaryChartLabels = this.stepSummaryChartLabels;
    this.weightWidgetChartData = this.stepSummaryChartData;
    this.weightWidgetChartLabels = this.stepSummaryChartLabels;
    this.exerciseWidgetChartData = this.stepSummaryChartData;
    this.exerciseWidgetChartLabels = this.stepSummaryChartLabels;

    this.showPush = false;
    this.showJourney = false;
    this.showBestDay = false;
    this.showStreak = false;

    this.summaryWidgetChartOptions = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
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
        },
      },
      legend: {
        display: false
      }
    };
    this.summaryWidgetChartColours = [
      {
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
      }
    ];
    this.summaryWidgetChartLegend = false;
    this.summaryWidgetChartType = 'line';

    this.intraDayWidgetChartOptions = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
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
        },
      },
      legend: {
        display: false
      }
    };
    this.intraDayWidgetChartColours = [
      {
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',
      }
    ];
    this.intraDayWidgetChartLegend = false;
    this.intraDayWidgetChartType = 'bar';

    this.weightWidgetChartOptions = {
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
        display: false
      }
    };
    this.weightWidgetChartColours = [
      { // brandInfo
        backgroundColor: hexToRgba(getStyle('--info'), 10),
        borderColor: getStyle('--info'),
        pointHoverBackgroundColor: '#fff'
      },
      { // brandSuccess
        backgroundColor: 'transparent',
        borderColor: getStyle('--success'),
        pointHoverBackgroundColor: '#fff'
      }
    ];
    this.weightWidgetChartLegend = false;
    this.weightWidgetChartType = 'line';

    this.exerciseWidgetChartOptions = {
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
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: 1,
            max: 4,
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
    this.exerciseWidgetChartColours = [
      { // brandInfo
        backgroundColor: 'transparent',
        borderColor: getStyle('--info'),
        pointHoverBackgroundColor: '#fff'
      },
      { // brandSuccess
        backgroundColor: 'transparent',
        borderColor: getStyle('--success'),
        pointHoverBackgroundColor: '#fff'
      }
    ];
    this.exerciseWidgetChartLegend = true;
    this.exerciseWidgetChartType = 'line';

  }

  ngOnInit(): void {
    this.apiService.getProfile().subscribe((data) => {
      this.profileName = data['nameFull'];
      this.profileAvatar = data['avatar'];

      this.profileAwards = Object.keys(data['rewards']).map(it => data['rewards'][it]);

      this.profileXp = data['xp'];
      this.profileXpLog = Object.keys(data['xp_log']).map(it => data['xp_log'][it]);
      this.profileXpProgress = data['level_next_in'];
      this.profileXpTarget = 50;

      this.profileLevel = 'assets/xplevels/' + data['level'] + '.png';
    });

    this.apiService.getFitDashboard().subscribe((data) => {
      // console.log(data);
      this.stepsPopulate(data);
      this.floorsPopulate(data);

      this.distanceSummary = data['distance']['value'];
      this.distanceSummaryGoal = data['distance']['goal'];
      this.distanceSummaryPercentage = data['distance']['progress'];
      this.distanceSummaryChartData = [];
      this.distanceSummaryChartData.push(data['distance']['widget']['data']);
      this.distanceSummaryChartLabels = data['distance']['widget']['labels'];

      this.weightCurrent = data['weight']['value'];
      this.weightCurrentUnit = data['weight']['unit'];
      this.weightPercentage = data['weight']['progress'];
      this.weightWidgetChartSince = data['weight']['since'];
      this.weightWidgetChartData = [];
      for (let i = 0; i < data['weight']['widget']['data'].length; i++) {
        this.weightWidgetChartData.push(data['weight']['widget']['data'][i]);
      }
      this.weightWidgetChartLabels = data['weight']['widget']['labels'];
      this.weightWidgetChartOptions = {
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
              min: data['weight']['widget']['axis']['min']
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

      this.fatCurrent = data['fat']['value'];
      this.fatCurrentUnit = data['fat']['unit'];
      this.fatPercentage = data['fat']['progress'];

      if (data['best'].length > 0) {
        this.showBestDay = true;
        this.theBest = data['best'];
      }

      if (data['milestones']['distance']['more'].length > 0 || data['milestones']['distance']['less'].length > 0) {
        this.theMilestonesMore = [];
        for (let i = 0; i < data['milestones']['distance']['more'].length; i++) {
          this.theMilestonesMore.push(this.markdownString(data['milestones']['distance']['more'][i]));
        }

        this.theMilestonesLess = [];
        for (let i = 0; i < data['milestones']['distance']['less'].length; i++) {
          this.theMilestonesLess.push(this.markdownString(data['milestones']['distance']['less'][i]));
        }
      }

      this.exerciseHistory = [];
      for (let i = 0; i < data['exercise']['history'].length; i++) {
        this.exerciseHistory.push(this.markdownString(data['exercise']['history'][i]));
      }

      this.exerciseWidgetChartData = [];
      for (let i = 0; i < data['exercise']['data'].length; i++) {
        this.exerciseWidgetChartData.push(data['exercise']['data'][i]);
      }
      this.exerciseWidgetChartLabels = data['exercise']['labels'];

      this.showStreak = false;
      this.showPush = false;
      this.showJourney = false;
    });

  }

  private markdownString(datumElementElement: string) {
    return this.markdownService.compile(datumElementElement).replace('<p>', '').replace('</p>', '');
  }

  private stepsPopulate(data: Object) {
    this.stepSummary = data['steps']['value'];
    this.stepSummaryGoal = data['steps']['goal'];
    this.stepSummaryPercentage = data['steps']['progress'];
    this.stepSummaryChartData = [];
    this.stepSummaryChartData.push(data['steps']['widget']['data']);
    this.stepSummaryChartLabels = data['steps']['widget']['labels'];
    this.stepIntraDayChartData = [];
    this.stepIntraDayChartData.push(data['stepsIntraDay']['widget']['data']);
    this.stepIntraDayChartLabels = data['stepsIntraDay']['widget']['labels'];
  }

  private floorsPopulate(data: Object) {
    this.floorsSummary = data['floors']['value'];
    this.floorsSummaryGoal = data['floors']['goal'];
    this.floorsSummaryPercentage = data['floors']['progress'];
    // this.floorSummaryChartData = [];
    // this.floorSummaryChartData.push(data['floors']['widget']['data']);
    // this.floorSummaryChartLabels = data['floors']['widget']['labels'];
    this.floorIntraDayChartData = [];
    this.floorIntraDayChartData.push(data['floorsIntraDay']['widget']['data']);
    this.floorIntraDayChartLabels = data['floorsIntraDay']['widget']['labels'];
  }
}

