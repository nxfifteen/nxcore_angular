import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {AuthenticationService} from '../../_services';
import {environment} from '../../../environments/environment';
import {User} from '../../_models';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-auth-with-fitbit',
  templateUrl: './auth-with-fitbit.component.html'
})
export class AuthWithFitbitComponent implements OnInit {
  authUrl: string;
  currentUser: User;
  completed: boolean;

  constructor(@Inject(DOCUMENT) private document: Document,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.completed = false;
    this.route.queryParams.subscribe(params => {
      if (params['complete']) {
        this.completed = true;
        this.currentUser.firstrun = false;
      } else {
        this.authUrl = `${environment.apiUrl}/auth/with/fitbit/${this.currentUser.username}?key=${this.currentUser.token}&return=${environment.uiUrl}`;
        this.document.location.href = this.authUrl;
      }
    });
  }

}
