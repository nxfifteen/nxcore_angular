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
  userConfig: User;
  private appConfig;

  constructor(private authenticationService: AuthenticationService) {
    this.loadUserConfig();
  }

  loadUserConfig() {
    this.authenticationService.currentUser.subscribe((data) => {
      this.userConfig = data;
    });
  }
}
