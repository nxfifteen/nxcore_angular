import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MarkdownService} from 'ngx-markdown';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_services';
import {User} from '../../_models';
import {MatomoService} from '../../services/matomo.service';
import {ActivityLog, ActivityLogNav} from '../../_models/activityLog';

@Component({
  templateUrl: './activity_log.component.html',
  styleUrls: ['activity_log.component.scss']
})
export class ActivityLogComponent implements OnInit {
  loading: number;
  loadingExpected: number;
  currentUser: User;
  activityLogs: Array<ActivityLog>;
  activityLogsNav: ActivityLogNav;
  activityDurations: { labels: Array<string>; values: Array<number>; };
  activityPartOfDays: { labels: Array<string>; values: Array<number>; };

  activityAllTimeDurations: { labels: Array<string>; values: Array<number>; };
  activityAllTimePartOfDays: { labels: Array<string>; values: Array<number>; };

  activityDetails: { dateFrom: string; dateBackTill: string; searchRange: string; };

  pageTitle: string = 'Core | Activities | Activity Log';
  searchTitle: string = '';
  searchFromDate: string = '';
  searchSearchRange: string = '/within/1m';

  // PolarArea
  public activityDurationsChartLabels: string[];
  public activityDurationsChartData: number[];
  public activityPartOfDaysChartLabels: string[];
  public activityPartOfDaysChartData: number[];
  public activityAllTimeDurationsChartLabels: string[];
  public activityAllTimeDurationsChartData: number[];
  public activityAllTimePartOfDaysChartLabels: string[];
  public activityAllTimePartOfDaysChartData: number[];

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private markdownService: MarkdownService,
              private apiService: ApiService,
              private _matomoService: MatomoService
  ) {
    this.loading = 0;
    this.loadingExpected = 5;
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (this.currentUser.firstrun) {
      this.router.navigate(['/onboarding']);
    } else {
      this._matomoService.setupTracking(this.pageTitle);
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
    this.buildViewContent(false, '', '/within/1m');
  }

  buildViewContent(bustCache?: boolean, fromDate?: string, searchRange?: string): void {
    this.loading = 0;
    if (typeof fromDate === 'undefined') {
      fromDate = this.searchFromDate;
    } else {
      this.searchFromDate = fromDate;
    }
    if (typeof searchRange === 'undefined') {
      searchRange = this.searchSearchRange;
    } else {
      this.searchSearchRange = searchRange;
    }

    this.apiService.getActivitiesLog(bustCache, fromDate, searchRange).subscribe((data) => {
      this.activityLogs = data['results'];
      this.activityLogsNav = data['nav'];
      this.searchTitle = data['title'];
      this.activityDetails = {
        dateFrom: data['dateFrom'],
        dateBackTill: data['dateBackTill'],
        searchRange: data['searchRange']
      };

      this.emitApiLoaded();

      this.activityDurations = data['periodDurations'];
      this.activityDurationsChartLabels = this.activityDurations.labels;
      this.activityDurationsChartData = this.activityDurations.values;

      this.emitApiLoaded();

      this.activityPartOfDays = data['periodPartOfDays'];
      this.activityPartOfDaysChartLabels = this.activityPartOfDays.labels;
      this.activityPartOfDaysChartData = this.activityPartOfDays.values;

      this.emitApiLoaded();

      this.activityAllTimeDurations = data['durations'];
      this.activityAllTimeDurationsChartLabels = this.activityAllTimeDurations.labels;
      this.activityAllTimeDurationsChartData = this.activityAllTimeDurations.values;

      this.emitApiLoaded();

      this.activityAllTimePartOfDays = data['partOfDays'];
      this.activityAllTimePartOfDaysChartLabels = this.activityAllTimePartOfDays.labels;
      this.activityAllTimePartOfDaysChartData = this.activityAllTimePartOfDays.values;

      this.emitApiLoaded();
    });
  }

  private emitApiLoaded() {
    this.loading++;
    if (this.loading >= this.loadingExpected) {
      this._matomoService.doTracking(-1, this.pageTitle + ' - ' + this.searchTitle);
    }
  }

  activityClicked(id: number) {
    this.router.navigate(['/activities/log', id]);
  }
}
