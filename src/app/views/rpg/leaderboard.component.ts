import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MarkdownService} from 'ngx-markdown';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_services';
import {User} from '../../_models';
import {Friends} from '../../_models/friends';
import {MatomoTracker} from 'ngx-matomo';
import {Title} from '@angular/platform-browser';
import {MatomoService} from '../../services/matomo.service';

@Component({
  templateUrl: 'leaderboard.component.html'
})
export class LeaderboardComponent implements OnInit {
  loading: number;
  loadingExpected: number;
  currentUser: User;
  profileAvatar: string;

  rpgFriends: Array<Friends>;
  ragFriendsHighestSteps: number;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private markdownService: MarkdownService,
              private apiService: ApiService,
              private _matomoService: MatomoService,
              private titleService: Title) {
    this.loading = 0;
    this.loadingExpected = 2;
  }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this._matomoService.setupTracking('Core | RPG | Leaderboard');
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

  buildViewContent(bustCache?: boolean): void {
    this.loading = 0;

    this.apiService.getProfile(bustCache).subscribe((data) => {
      this.profileAvatar = data['avatar'];

      this.emitApiLoaded();
    });

    this.apiService.getRpgFriends(bustCache).subscribe((data) => {
      this.rpgFriends = data['friends'];
      this.ragFriendsHighestSteps = data['maxSteps'];

      this.emitApiLoaded();
    });
  }

  private emitApiLoaded() {
    this.loading++;
    if (this.loading >= this.loadingExpected) {
      this._matomoService.doTracking();
    }
  }
}

