import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MarkdownService} from 'ngx-markdown';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_services';
import {User} from '../../_models';
import {AwardBadge} from '../../_models/awardBadge';
import {MatomoTracker} from 'ngx-matomo';
import {Title} from '@angular/platform-browser';
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
              private _matomoService: MatomoService,
              private titleService: Title) {
    this.loading = 0;
    this.loadingExpected = 1;
  }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this._matomoService.setupTracking('Core | Award | Details');
    this._matomoService.setCustomVariable('apiCalls', this.loadingExpected.toString(), 'page');
    if (this.currentUser.firstrun) {
      this.router.navigate(['/setup/profile']);
    } else {
      this._ActivatedRoute.paramMap.subscribe(params => {
        // tslint:disable-next-line:radix
        this.awardId = parseInt(params.get('id'));
      });

      this.pullToRefresh();
    }
  }

  pullToRefresh(): void {
    this.loading = 0;

    this.apiService.getAchievementsAwardDetails(this.awardId).subscribe((data) => {
      // @ts-ignore
      this.awardBadge = data;
      this.titleService.setTitle('Core | Awards | ' + this.awardBadge.name);

      this.emitApiLoaded();
    });
  }

  private emitApiLoaded() {
    this.loading++;
    console.log('Loading... ' + this.loading + '/' + this.loadingExpected);
    if (this.loading >= this.loadingExpected) {
      console.log('Loaded all components');
      this._matomoService.doTracking();
    }
  }
}

