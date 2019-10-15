import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AlertService, AuthenticationService} from '../../_services';
import {ApiService} from '../../services/api.service';
import {User} from '../../_models';
import {Router} from '@angular/router';
import {MatomoService} from '../../services/matomo.service';

@Component({
  templateUrl: './patreon.component.html'
})
export class PatreonComponent implements OnInit {
  currentUser: User;

  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private apiService: ApiService,
              public _matomoService: MatomoService) {
  }

  ngOnInit() {
  }

}
