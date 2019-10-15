import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MarkdownService} from 'ngx-markdown';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_services';
import {User} from '../../_models';
import {AwardBadge} from '../../_models/awardBadge';
import {MatomoService} from '../../services/matomo.service';

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

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private markdownService: MarkdownService,
              private apiService: ApiService,
              private _ActivatedRoute: ActivatedRoute,
              private _matomoService: MatomoService) {
    this.loading = 0;
    this.loadingExpected = 1;
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

