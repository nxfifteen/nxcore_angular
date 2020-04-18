/*
 * This file is part of NxFIFTEEN Fitness Core.
 *
 * @link      https://nxfifteen.me.uk/projects/nxcore/
 * @link      https://gitlab.com/nx-core/frontend/angular
 * @author    Stuart McCulloch Anderson <stuart@nxfifteen.me.uk>
 * @copyright Copyright (c) 2020. Stuart McCulloch Anderson <stuart@nxfifteen.me.uk>
 * @license   https://nxfifteen.me.uk/api/license/mit/license.html MIT
 */

import {Injectable} from '@angular/core';
import {MatomoInjector, MatomoTracker} from 'ngx-matomo';
import {AuthenticationService} from '../_services';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {User} from '../_models';
import {CordovaService} from './cordova.service';
import {AppConfigService} from './app-config.service';

declare var device;

@Injectable({
  providedIn: 'root'
})
export class MatomoService {
  currentUser: User;
  coreDashboard: string;
  injected: boolean;
  saveVariablesPage: Array<string>;
  saveVariablesVisit: Array<string>;
  loadStartedTime: number;
  siteId: number;
  private readonly matomoUrl: string;
  private readonly matomoSiteId: number;
  private readonly matomoSiteIdCordova: number;
  private matomo: boolean;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private titleService: Title,
              public _matomoTracker: MatomoTracker,
              private _matomoInjector: MatomoInjector,
              private _cordovaService: CordovaService,
              private appConfig: AppConfigService
  ) {
    this.matomo = false;
    this.matomoUrl = appConfig.config.matomoUrl;
    this.matomoSiteId = appConfig.config.matomoSiteId;
    this.matomoSiteIdCordova = appConfig.config.matomoSiteIdCordova;
    this.injected = false;
    this.siteId = this.matomoSiteId;

    if (this.matomoUrl !== '' && (this.matomoSiteId > 0 || this.matomoSiteIdCordova > 0)) {
      this.matomo = true;
    }
  }

  get pageTitle() {
    const titleParts = this.coreDashboard.split(' | ');
    return titleParts.pop();
  }

  inject() {
    if (this.matomo && !this.injected) {
      if (this._cordovaService.onCordova) {
        this.siteId = this.matomoSiteIdCordova;
      } else {
        this.siteId = this.matomoSiteId;
      }
      this._matomoInjector.init(this.matomoUrl, this.siteId);
      this.injected = true;
    }
  }

  setupTracking(_coreDashboard: string) {
    if (this.matomo) {
      this.inject();

      this.loadStartedTime = new Date().getTime();

      this.coreDashboard = _coreDashboard;
      this.titleService.setTitle(this.coreDashboard);
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

      this.deleteCustomVariable(1, 'page');
      this.deleteCustomVariable(2, 'page');
      this.deleteCustomVariable(3, 'page');
      this.deleteCustomVariable(4, 'page');
      this.deleteCustomVariable(5, 'page');
      this.deleteCustomVariable(6, 'page');

      this.deleteCustomVariable(1, 'visit');
      this.deleteCustomVariable(2, 'visit');
      this.deleteCustomVariable(3, 'visit');
      this.deleteCustomVariable(4, 'visit');
      this.deleteCustomVariable(5, 'visit');
      this.deleteCustomVariable(6, 'visit');

      this.saveVariablesPage = [];
      this.saveVariablesVisit = [];

      this.setGenerationTimeMs(0);
    }
  }

  doTracking(generationTimeMs?: number, _coreDashboard?: string) {
    if (this.matomo) {
      if (generationTimeMs && generationTimeMs > 0) {
        this.setGenerationTimeMs(generationTimeMs);
      }
      if (typeof _coreDashboard !== 'undefined') {
        this.coreDashboard = _coreDashboard;
        this.titleService.setTitle(this.coreDashboard);
      }
      this.setCustomUrl(this.router.url);
      this.setDocumentTitle(this.coreDashboard);
      this.setUserId(this.currentUser.username);
      this.trackPageView();
    }
  }

  deleteCustomVariable(index: number, scope: string) {
    if (this.matomo) {
      this._matomoTracker.deleteCustomVariable(index, scope);
    }
  }

  setCustomVariable(name: string, value: string, scope: string) {
    if (this.matomo) {
      let index = 0;

      if (scope === 'page') {
        index = this.saveVariablesPage.findIndex((v) => {
          return v === name;
        });

        if (index === -1) {
          this.saveVariablesPage.push(name);
          index = this.saveVariablesPage.findIndex((v) => {
            return v === name;
          });
        }

        index = index + 1;
      } else {
        index = this.saveVariablesVisit.findIndex((v) => {
          return v === name;
        });

        if (index === -1) {
          this.saveVariablesVisit.push(name);
          index = this.saveVariablesVisit.findIndex((v) => {
            return v === name;
          });
        }

        index = index + 1;
      }

      this._matomoTracker.setCustomVariable(index, name, value, scope);
    }
  }

  setGenerationTimeMs(generationTime: number) {
    if (this.matomo) {
      this._matomoTracker.setGenerationTimeMs(generationTime);
    }
  }

  setCustomUrl(url: string) {
    if (this.matomo) {
      this._matomoTracker.setCustomUrl(url);
    }
  }

  setDocumentTitle(title: string) {
    if (this.matomo) {
      this._matomoTracker.setDocumentTitle(title);
    }
  }

  setUserId(userId: string) {
    if (this.matomo) {
      this._matomoTracker.setUserId(userId);
    }
  }

  trackPageView(customTitle?: string) {
    if (this.matomo) {
      const loadTime: number = (new Date().getTime()) - this.loadStartedTime;

      this.setGenerationTimeMs(loadTime);
      this._matomoTracker.trackPageView(customTitle);
    }
  }

  trackEvent(category: string, action: string, name?: string, value?: number) {
    if (this.matomo) {
      this._matomoTracker.trackEvent(category, action, name, value);
    }
  }
}
