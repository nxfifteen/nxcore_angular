import {Injectable} from '@angular/core';
import {MatomoInjector, MatomoTracker} from 'ngx-matomo';
import {AuthenticationService} from '../_services';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {User} from '../_models';

@Injectable({
  providedIn: 'root'
})
export class MatomoService {
  currentUser: User;
  coreDashboard: string;
  saveVariablesPage: Array<string>;
  saveVariablesVisit: number;
  loadStartedTime: number;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private titleService: Title,
              private _matomoTracker: MatomoTracker,
              private _matomoInjector: MatomoInjector
  ) {
  }

  setupTracking(_coreDashboard: string) {
    this.loadStartedTime = new Date().getTime();
    console.log('Tracker: Setup');

    this.coreDashboard = _coreDashboard;
    this.titleService.setTitle(this.coreDashboard);
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    this.deleteCustomVariable(1, 'page');
    this.deleteCustomVariable(2, 'page');
    this.deleteCustomVariable(3, 'page');
    this.deleteCustomVariable(4, 'page');
    this.deleteCustomVariable(5, 'page');

    this.saveVariablesPage = [];
    // this.saveVariablesVisit = [];

    this.setGenerationTimeMs(0);
  }

  doTracking(generationTimeMs?: number) {
    if (generationTimeMs) {
      this.setGenerationTimeMs(generationTimeMs);
    }
    this.setCustomUrl(this.router.url);
    this.setDocumentTitle(this.coreDashboard);
    this.setUserId(this.currentUser.username);
    this.trackPageView();
  }

  deleteCustomVariable(index: number, scope: string) {
    this._matomoTracker.deleteCustomVariable(index, scope);
  }

  setCustomVariable(name: string, value: string, scope: string) {
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

      console.log('Var name       : ' + name);
      console.log('Pass Index     : ' + index);
    }

    // console.log('Page variables (' + name + ' [' + index + '] ' + this.saveVariablesPage.length + ')');
    // console.log(this.saveVariablesVisit + ' Visit variables (' + name + ' [' + index + '])');

    this._matomoTracker.setCustomVariable(index, name, value, scope);
  }

  setGenerationTimeMs(generationTime: number) {
    this._matomoTracker.setGenerationTimeMs(generationTime);
  }

  setCustomUrl(url: string) {
    this._matomoTracker.setCustomUrl(url);
  }

  setDocumentTitle(title: string) {
    this._matomoTracker.setDocumentTitle(title);
  }

  setUserId(userId: string) {
    this._matomoTracker.setUserId(userId);
  }

  trackPageView(customTitle?: string) {
    const loadTime: number = (new Date().getTime()) - this.loadStartedTime;
    console.log('Tracker: trackPageView');
    console.log('           Started at: ' + this.loadStartedTime);
    console.log('            Loaded at: ' + new Date().getTime());
    console.log('       Page Loaded in: ' + loadTime);

    this.setGenerationTimeMs(loadTime);
    this._matomoTracker.trackPageView(customTitle);

    console.log(this.saveVariablesPage);
  }

  trackEvent(category: string, action: string, name?: string, value?: number) {
    this._matomoTracker.trackEvent(category, action, name, value);
  }
}
