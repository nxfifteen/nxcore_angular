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
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_services';
import {User} from '../../_models';
import {AwardBadge} from '../../_models/awardBadge';
import {MatomoService} from '../../services/matomo.service';
import {AppConfigService} from '../../services/app-config.service';

@Component({
  templateUrl: 'awards_detail.component.html',
  styleUrls: ['awards_detail.component.scss']
})
export class AwardsDetailComponent implements OnInit {
  loading: number;
  loadingExpected: number;
  currentUser: User;
  awardsSummaries = [];
  factor: number;
  level: number;
  xp: number;
  xpLog = [];
  awardId: number;
  awardBadge: AwardBadge;
  private assets_badges: string;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private markdownService: MarkdownService,
              private apiService: ApiService,
              private _ActivatedRoute: ActivatedRoute,
              private appConfig: AppConfigService,
              private _matomoService: MatomoService) {
    this.loading = 0;
    this.loadingExpected = 1;
    this.assets_badges = appConfig.config.assets_badges;
  }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (this.currentUser.firstrun) {
      this.router.navigate(['/onboarding']);
    } else {
      this._matomoService.setupTracking('Core | Award | Details');
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

    this.apiService.getAchievementsAwardDetails(this.awardId, bustCache).subscribe((data) => {
      // @ts-ignore
      this.awardBadge = data;
      this.emitApiLoaded();
    });
  }

  private emitApiLoaded() {
    this.loading++;
    if (this.loading >= this.loadingExpected) {
      this._matomoService.doTracking(-1, 'Core | Award | Details | ' + this.awardBadge.name);
    }
  }
}

