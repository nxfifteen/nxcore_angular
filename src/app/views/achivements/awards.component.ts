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
import {ApiService} from '../../services/api.service';
import {MarkdownService} from 'ngx-markdown';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_services';
import {User} from '../../_models';
import {MatomoService} from '../../services/matomo.service';
import {AppConfigService} from '../../services/app-config.service';

@Component({
  templateUrl: 'awards.component.html'
})
export class AwardsComponent implements OnInit {
  loading: number;
  loadingExpected: number;
  currentUser: User;
  awardsSummaries = [];
  factor: number;
  level: number;
  xp: number;
  xpNext: number;
  levelNext: number;
  levelPercentage: number;
  xpLog = [];
  private assets_badges: string;
  private assets_xp_levels: string;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private markdownService: MarkdownService,
              private apiService: ApiService,
              private appConfig: AppConfigService,
              private _matomoService: MatomoService) {
    this.loading = 0;
    this.loadingExpected = 1;
    this.assets_badges = appConfig.config.assets_badges;
    this.assets_xp_levels = appConfig.config.assets_xp_levels;
  }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (this.currentUser.firstrun) {
      this.router.navigate(['/onboarding']);
    } else {
      this._matomoService.setupTracking('Core | Awards');
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
    this.loadingExpected = 1;

    this.apiService.getAchievementsAwards(bustCache).subscribe((data) => {

      this.awardsSummaries = [];
      if (data['awards']) {
        this.awardsSummaries = Object.keys(data['awards']).map(it => data['awards'][it]);
      }
      this.xpLog = [];
      if (data['xp_log']) {
        this.xpLog = Object.keys(data['xp_log']).map(it => data['xp_log'][it]);
      }

      this.factor = data['factor'];
      this.level = data['level'];
      this.xp = data['xp'];
      this.xpNext = data['xp_next'];
      this.levelNext = data['level_next'];
      this.levelPercentage = data['level_percentage'];

      this.emitApiLoaded();
    });
  }

  awardClicked(id: number) {
    this.router.navigate(['/achievements/awards/info', id]);
  }

  private emitApiLoaded() {
    this.loading++;
    if (this.loading >= this.loadingExpected) {
      this._matomoService.doTracking();
    }
  }
}

