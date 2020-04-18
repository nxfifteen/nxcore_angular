import {Injectable, Injector} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NavData, navItems} from '../_nav';
import {AuthenticationService} from '../_services';
import {User} from '../_models';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  uiSettings: { showNavBar: string | boolean, showAsideBar: string | boolean } = {'showNavBar': true, 'showAsideBar': true};
  navItems: NavData[] = navItems;
  private userConfig: User;
  private appConfig;

  constructor(private injector: Injector, private authenticationService: AuthenticationService) {
    this.loadUserConfig();
  }

  loadUserConfig() {
    this.authenticationService.currentUser.subscribe((data) => {
      this.userConfig = data;
    });
  }

  loadAppConfig() {
    const http = this.injector.get(HttpClient);

    return http.get('/assets/app-config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      }).catch(error => {
        console.warn('Error loading app-config.json, using environment file instead');
        this.appConfig = environment;
      });
  }

  get app() {
    return this.appConfig;
  }

  get user() {
    return this.userConfig;
  }
}
