import {Component, OnInit} from '@angular/core';
import {getStyle} from '@coreui/coreui/dist/js/coreui-utilities';
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {ApiService} from '../../services/api.service';
import {MarkdownService} from 'ngx-markdown';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_services';
import {User} from '../../_models';
import {Title} from '@angular/platform-browser';
import {MatomoService} from '../../services/matomo.service';

@Component({
  templateUrl: './activity.component.html'
})
export class ActivityComponent implements OnInit {
  loading: number;
  loadingExpected: number;
  currentUser: User;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private markdownService: MarkdownService,
              private apiService: ApiService,
              private _matomoService: MatomoService
  ) {
    this.loading = 0;
    this.loadingExpected = 0;
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this._matomoService.setupTracking('Core | Activities | Tracker');
    this._matomoService.setCustomVariable('apiCalls', this.loadingExpected.toString(), 'page');
    if (this.currentUser.firstrun) {
      this.router.navigate(['/setup/profile']);
    } else {
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

  buildViewContent(bustCache?: boolean): void { }

  private emitApiLoaded() {
    this.loading++;
    if (this.loading >= this.loadingExpected) {
      this._matomoService.doTracking();
    }
  }

}
