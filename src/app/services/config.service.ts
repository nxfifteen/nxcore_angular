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
