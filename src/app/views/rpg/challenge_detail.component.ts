/*
 * This file is part of NxFIFTEEN Fitness Core.
 *
 * @link      https://nxfifteen.me.uk/projects/nxcore/
 * @link      https://gitlab.com/nx-core/frontend/angular
 * @author    Stuart McCulloch Anderson <stuart@nxfifteen.me.uk>
 * @copyright Copyright (c) 2020. Stuart McCulloch Anderson <stuart@nxfifteen.me.uk>
 * @license   https://nxfifteen.me.uk/api/license/mit/license.html MIT
 */

import {Component, OnInit} from '@angular/core';
import {getStyle} from '@coreui/coreui/dist/js/coreui-utilities';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {ApiService} from '../../services/api.service';
import {MarkdownService} from 'ngx-markdown';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_services';
import {User} from '../../_models';
import {ChallengeActive} from '../../_models/challengeActive';
import {Title} from '@angular/platform-browser';
import {MatomoService} from '../../services/matomo.service';
import {ActivityLogNav} from '../../_models/activityLog';
import {environment} from '../../../environments/environment';
import {AppConfigService} from "../../services/app-config.service";

@Component({
  templateUrl: 'challenge_detail.component.html'
})
export class ChallengeDetailComponent implements OnInit {
  loading: number;
  loadingExpected: number;
  currentUser: User;
  awardId: number;
  challengeActive: ChallengeActive;
  challengeNav: ActivityLogNav;

  challengeWidgetChartOptions: any;
  challengeWidgetChartColours: any;
  challengeWidgetChartLegend: boolean;
  challengeWidgetChartType: string;
  // noinspection JSMismatchedCollectionQueryUpdate
  challengeWidgetChartData: Array<any>;
  // noinspection JSMismatchedCollectionQueryUpdate
  challengeWidgetChartLabels: Array<any>;

  progressWidgetChartOptions: any;
  progressWidgetChartColours: any;
  progressWidgetChartLegend: boolean;
  progressWidgetChartType: string;
  // noinspection JSMismatchedCollectionQueryUpdate
  progressWidgetChartData: Array<any>;
  // noinspection JSMismatchedCollectionQueryUpdate
  progressWidgetChartLabels: Array<any>;
  svgPathUser: string;
  svgPathOpp: string;
  challengeOutcome: string;
  challengeOutcomeFriendly: string;
  challengeOutcomeFriendlyText: string;
  challengeOutcomeRibbonWinner: string;
  challengeOutcomeRibbonLoser: string;
  private readonly isProduction: boolean;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private markdownService: MarkdownService,
              private apiService: ApiService,
              private _ActivatedRoute: ActivatedRoute,
              private _matomoService: MatomoService,
              private titleService: Title,
              private appConfig: AppConfigService) {
    this.isProduction = appConfig.config.production;
    this.loadingExpected = 1;

    this.challengeWidgetChartData = [
      {
        data: [0],
        label: 'Loading'
      }
    ];
    this.challengeWidgetChartLabels = ['Loading'];
    this.challengeWidgetChartOptions = {
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
    this.challengeWidgetChartColours = [
      { // brandInfo
        backgroundColor: 'transparent',
        borderColor: getStyle('--info'),
        pointHoverBackgroundColor: '#fff',
        borderWidth: 1,
        borderDash: [8, 5]
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
    this.challengeWidgetChartLegend = true;
    this.challengeWidgetChartType = 'line';

    this.progressWidgetChartData = [
      {
        data: [0],
        label: 'Loading'
      }
    ];
    this.progressWidgetChartLabels = ['Loading'];
    this.progressWidgetChartOptions = {
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
    this.progressWidgetChartColours = [
      { // brandSuccess
        backgroundColor: 'transparent',
        borderColor: getStyle('--success'),
        pointHoverBackgroundColor: '#fff'
      },
      { // brandSuccess
        backgroundColor: 'transparent',
        borderColor: getStyle('--warning'),
        pointHoverBackgroundColor: '#fff'
      },
      { // brandSuccess
        backgroundColor: 'transparent',
        borderColor: getStyle('--danger'),
        pointHoverBackgroundColor: '#fff'
      }
    ];
    this.progressWidgetChartLegend = true;
    this.progressWidgetChartType = 'line';
  }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (this.currentUser.firstrun) {
      this.router.navigate(['/onboarding']);
    } else {
      this._matomoService.setupTracking('Core | RPG | 1:1 Challenges');
      this._matomoService.setCustomVariable('apiCalls', this.loadingExpected.toString(), 'page');
      this._ActivatedRoute.paramMap.subscribe(params => {
        // tslint:disable-next-line:radix
        this.awardId = parseInt(params.get('id'));
      });

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
    this.loadingExpected = 1;
    this.challengeOutcomeRibbonWinner = 'none';
    this.challengeOutcomeRibbonLoser = 'none';
    this.challengeOutcomeFriendly = '';
    this.challengeOutcomeFriendlyText = '';

    this.apiService.getRpgPvpDetails(this.awardId, bustCache).subscribe((data) => {
      // @ts-ignore
      this.challengeActive = data;
      this.challengeNav = data['nav'];

      switch (this.challengeActive.outcome) {
        case 'win':
          this.challengeOutcome = 'success';
          this.challengeOutcomeRibbonWinner = 'block';
          this.challengeOutcomeFriendly = 'You won!';
          this.challengeOutcomeFriendlyText = `You won the challenge. You completed ${this.challengeActive.target} ${this.challengeActive.criteria} and beat ${this.challengeActive.opponent}.`;
          break;
        case 'lose':
          this.challengeOutcome = 'danger';
          this.challengeOutcomeRibbonLoser = 'block';
          this.challengeOutcomeFriendly = 'You lost';
          this.challengeOutcomeFriendlyText = `You lost the challenge. ${this.challengeActive.opponent} completed ${this.challengeActive.target} ${this.challengeActive.criteria} before you could.`;
          break;
        default:
          this.challengeOutcome = 'warning';
          break;
      }

      this.svgPathUser = 'M 0,' + this.challengeActive.userDetail.progress + ' V 100 H 100 Z';
      this.svgPathOpp = 'M 100,' + this.challengeActive.opponentDetail.progress + ' V 100 H 0 Z';

      this.challengeWidgetChartData = [];
      for (let i = 0; i < data['widget']['data'].length; i++) {
        this.challengeWidgetChartData.push(data['widget']['data'][i]);
      }
      this.challengeWidgetChartLabels = data['widget']['labels'];

      this.challengeWidgetChartOptions = {
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
              max: data['widget']['axis']['max'],
              min: (data['widget']['axis']['min'] - 1)
            }
          }]
        },
        elements: {
          line: {
            borderWidth: 2
          },
          point: {
            radius: 5,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
          }
        },
        legend: {
          display: true
        }
      };

      this.progressWidgetChartData = [];
      for (let i = 0; i < data['challenge']['data'].length; i++) {
        this.progressWidgetChartData.push(data['challenge']['data'][i]);
      }
      this.progressWidgetChartLabels = data['challenge']['labels'];

      this.progressWidgetChartOptions = {
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
              max: this.challengeActive.target,
              min: 0
            }
          }]
        },
        elements: {
          line: {
            borderWidth: 2
          },
          point: {
            radius: 5,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
          }
        },
        legend: {
          display: true
        }
      };

      this.emitApiLoaded();

      if (typeof this.challengeNav.nextMonth !== 'undefined' && this.challengeNav.nextMonth !== '') {
        // tslint:disable-next-line:no-shadowed-variable
        this.apiService.getRpgPvpDetails(this.challengeNav.nextMonth, false).subscribe((data) => {
          if (!this.isProduction) {
            console.log('Pre-cached ' + this.challengeNav.nextMonth);
          }
        });
      }
      if (typeof this.challengeNav.prevMonth !== 'undefined' && this.challengeNav.prevMonth !== '') {
        // tslint:disable-next-line:no-shadowed-variable
        this.apiService.getRpgPvpDetails(this.challengeNav.prevMonth, false).subscribe((data) => {
          if (!this.isProduction) {
            console.log('Pre-cached ' + this.challengeNav.prevMonth);
          }
        });
      }
    });
  }

  private emitApiLoaded() {
    this.loading++;
    if (this.loading >= this.loadingExpected) {
      this._matomoService.doTracking(
        -1,
        'Core | RPG | 1:1 Challenges | '
        + this.challengeActive.target + '-' + this.challengeActive.criteria + ' Challenge against ' + this.challengeActive.opponent
      );
    }
  }

  navChallenge(nextMonth: number | string) {
    this.router.navigate(['/rpg/challenges/info', nextMonth]);

    if (typeof nextMonth === 'string') {
      // tslint:disable-next-line:radix
      this.awardId = parseInt(nextMonth);
    } else {
      this.awardId = nextMonth;
    }
    this.loadFromApi();
  }
}

