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
import {NavData, navItems} from '../_nav';
import {AuthenticationService} from '../_services';
import {User} from '../_models';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  uiSettings: { showNavBar: string | boolean, showAsideBar: string | boolean } = {'showNavBar': true, 'showAsideBar': true};
  navItems: NavData[] = navItems;
  currentUser: User;

  constructor(private authenticationService: AuthenticationService) {
    this.loadUserConfig();
  }

  loadUserConfig() {
    this.authenticationService.currentUser.subscribe((data) => {
      this.currentUser = data;
    });
  }
}
