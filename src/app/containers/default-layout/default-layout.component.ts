import {Component, Inject, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {navItems} from '../../_nav';
import {ApiService} from '../../services/api.service';
import {ConfigService} from '../../services/config.service';
import {AuthenticationService} from '../../_services';
import {User} from '../../_models';
import {Router} from '@angular/router';
import {SiteNews} from '../../_models/siteNews';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = false;
  private changes: MutationObserver;
  public element: HTMLElement;
  public profileName: string;
  public profileAvatar: string;
  public configService: ConfigService;
  public profileXp: number;
  currentUser: User;
  siteNews: Array<SiteNews>;

  constructor(private router: Router,
              private apiService: ApiService,
              private _configService: ConfigService,
              private authenticationService: AuthenticationService,
              @Inject(DOCUMENT) _document?: any) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.configService = _configService;

    // noinspection JSUnusedLocalSymbols
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });

    this.apiService.getProfile().subscribe((data) => {
      this.profileName = data['nameFull'];
      this.profileAvatar = data['avatar'];
      this.profileXp = data['xp'];
    });

    this.apiService.getSiteNews().subscribe((data) => {
      this.siteNews = [];
      for (let i = 0; i < data['hydra:totalItems']; i++) {
        this.siteNews.push(data['hydra:member'][i]);
      }
    });

  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
