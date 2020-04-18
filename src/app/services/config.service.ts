/*
 * This file is part of NxFIFTEEN Fitness Core.
 *
 * @link      https://nxfifteen.me.uk/projects/nxcore/angular
 * @link      https://nxfifteen.me.uk/projects/nxcore/
 * @link      https://gitlab.com/nx-core/frontend/angular
 * @author    Stuart McCulloch Anderson <stuart@nxfifteen.me.uk>
 * @copyright Copyright (c) 2020. Stuart McCulloch Anderson <stuart@nxfifteen.me.uk>
 * @license   https://nxfifteen.me.uk/api/license/mit/license.html MIT
 */

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
  }

  loadAppConfig() {
    const http = this.injector.get(HttpClient);
    // noinspection JSUnusedLocalSymbols
    const localConfig = http.get('/assets/app-config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      }).catch(error => {
        console.warn('Error loading app-config.json, using environment file instead');
        this.appConfig = environment;
      });

    this.authenticationService.currentUser.subscribe((data) => {
      this.userConfig = data;
    });

    return localConfig;
  }

  get app() {
    return this.appConfig;
  }

  get user() {
    return this.userConfig;
  }
}
