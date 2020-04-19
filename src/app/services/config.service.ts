/*
 * This file is part of NxFIFTEEN Fitness Core.
 *
 * @link      https://nxfifteen.me.uk/projects/nxcore/
 * @link      https://gitlab.com/nx-core/frontend/angular
 * @author    Stuart McCulloch Anderson <stuart@nxfifteen.me.uk>
 * @copyright Copyright (c) 2020. Stuart McCulloch Anderson <stuart@nxfifteen.me.uk>
 * @license   https://nxfifteen.me.uk/api/license/mit/license.html MIT
 */

import {Injectable, Injector} from '@angular/core';
import {NavData, navItems} from '../_nav';
import {AuthenticationService} from '../_services';
import {User} from '../_models';
import {AppConfigService} from './app-config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  navItems: NavData[] = navItems;
  currentUser: User;
  private userConfig;
  private readonly apiUrl: string;

  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService,
              private appConfig: AppConfigService,
              private injector: Injector) {
    this.apiUrl = appConfig.config.apiUrl;
    this.loadUserConfig();
  }

  get config() {
    return this.userConfig;
  }

  getNavItems() {
    const URL = `${this.apiUrl}/${this.currentUser.username}/ux/config?key=${this.currentUser.token}`;
    const response = this.httpClient.get<any>(URL);
    response.subscribe(data => this.navItems = data);
    return response;
  }

  private loadUserConfig() {
    this.authenticationService.currentUser.subscribe((data) => {
      this.currentUser = data;
    });
  }
}
