import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {AuthenticationService} from '../../_services';
import {User} from '../../_models';
import {ActivatedRoute, Router} from '@angular/router';
import {MatomoService} from '../../services/matomo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './auth-with-google.component.html'
})
export class AuthWithGoogleComponent implements OnInit {
  authUrl: string;
  currentUser: User;
  completed: boolean;

  constructor(@Inject(DOCUMENT) private document: Document,
              private router: Router,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private _matomoService: MatomoService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this._matomoService.setupTracking('Core | Connect | Google Fit');
    this._matomoService.doTracking();
    this.completed = false;
    this.route.queryParams.subscribe(params => {
      if (params['complete']) {
        this.completed = true;
        this.currentUser.firstrun = false;
        this.authenticationService.updateStorage();
      } else {
        // this.authUrl = `${environment.apiUrl}/auth/with/fitbit/${this.currentUser.username}?key=${this.currentUser.token}&return=${environment.uiUrl}`;
        // this.document.location.href = this.authUrl;
      }
    });
  }

}
