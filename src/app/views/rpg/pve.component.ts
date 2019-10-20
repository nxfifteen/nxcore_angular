import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MarkdownService} from 'ngx-markdown';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_services';
import {User} from '../../_models';
import {MatomoService} from '../../services/matomo.service';
import {ChallengePve} from '../../_models/challengePve';

@Component({
  templateUrl: 'pve.component.html',
  styleUrls: ['pve.component.scss']
})
export class PveComponent implements OnInit {
  loading: number;
  loadingExpected: number;
  currentUser: User;
  challenges: Array<ChallengePve>;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private markdownService: MarkdownService,
              private apiService: ApiService,
              private _matomoService: MatomoService) {
    this.loading = 0;
    this.loadingExpected = 1;

  }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (this.currentUser.firstrun) {
      this.router.navigate(['/onboarding']);
    } else {
      this._matomoService.setupTracking('Core | RPG | Challenges');
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

    this.apiService.getRpgPveIn(bustCache).subscribe((data) => {
      this.challenges = data['challenges'];

      this.emitApiLoaded();
    });
  }

  private emitApiLoaded() {
    if (this.loading < this.loadingExpected) {
      this.loading++;
      if (this.loading >= this.loadingExpected) {
        this._matomoService.doTracking();
      }
    }
  }
}

