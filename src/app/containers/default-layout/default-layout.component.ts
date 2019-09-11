import {Component, Inject, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {navItems} from '../../_nav';
import {ApiService} from '../../services/api.service';
import {ConfigService} from '../../services/config.service';

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

  constructor(private apiService: ApiService, private _configService: ConfigService, @Inject(DOCUMENT) _document?: any) {
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
    });

  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
