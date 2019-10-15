import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MarkdownService} from 'ngx-markdown';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_services';
import {User} from '../../_models';
import {MatomoService} from '../../services/matomo.service';
import {ActivityLog, ActivityLogNav} from '../../_models/activityLog';

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
