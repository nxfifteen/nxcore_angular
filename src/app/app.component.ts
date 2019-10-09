import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';
import {MatomoInjector} from 'ngx-matomo';
import {CordovaService} from './services/cordova.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  currentUser: User;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private matomoInjector: MatomoInjector) {
    this.matomoInjector.init('https://alpha.core.nxfifteen.me.uk/', 1);
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
