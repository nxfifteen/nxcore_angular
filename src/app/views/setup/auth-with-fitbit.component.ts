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

import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {AuthenticationService} from '../../_services';
import {ConfigService} from '../../services/config.service';
import {User} from '../../_models';
import {ActivatedRoute, Router} from '@angular/router';
import {MatomoService} from '../../services/matomo.service';

@Component({
  templateUrl: './auth-with-fitbit.component.html'
})
export class AuthWithFitbitComponent implements OnInit {
  authUrl: string;
  currentUser: User;
  completed: boolean;
  private readonly apiUrl: string;

  constructor(@Inject(DOCUMENT) private document: Document,
              private router: Router,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private _matomoService: MatomoService,
              environment: ConfigService) {
    this.apiUrl = environment.app.apiUrl;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this._matomoService.setupTracking('Core | Connect | Fitbit');
    this._matomoService.doTracking();
    this.completed = false;
    this.route.queryParams.subscribe(params => {
      if (params['complete']) {
        this.completed = true;
        this.currentUser.firstrun = false;
      } else {
        this.authUrl = `${this.apiUrl}/auth/with/fitbit/${this.currentUser.username}?key=${this.currentUser.token}&return=` +
          this.document.location.protocol + `//` + this.document.location.host + `&returnPath=oauth/setup/fitbit`;
        this.document.location.href = this.authUrl;
      }
    });
  }

}
