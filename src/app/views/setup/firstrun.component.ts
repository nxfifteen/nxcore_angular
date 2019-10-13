import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService, AuthenticationService} from '../../_services';
import {ApiService} from '../../services/api.service';
import {environment} from '../../../environments/environment';
import {first, map} from 'rxjs/operators';
import {MatomoTracker} from 'ngx-matomo';
import {Title} from '@angular/platform-browser';
import {User} from '../../_models';
import {Router} from '@angular/router';
import {MatomoService} from '../../services/matomo.service';

@Component({
  templateUrl: './firstrun.component.html',
  styleUrls: ['./firstrun.component.scss']
})
export class FirstrunComponent implements OnInit {
  currentUser: User;
  nameFormGroup: FormGroup;
  bodyFormGroup: FormGroup;
  emailFormGroup: FormGroup;

  loadingFormResponce = false;
  loadingData = true;
  loading: number;
  loadingExpected: number;
  submitted = false;
  returnUrl: string;

  get nameGroupControls() {
    return this.nameFormGroup.controls;
  }

  get emailGroupControls() {
    return this.emailFormGroup.controls;
  }

  get bodyGroupControls() {
    return this.bodyFormGroup.controls;
  }

  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private apiService: ApiService,
              private _matomoService: MatomoService,
              private titleService: Title) {
    this.loadingExpected = 1;
  }

  ngOnInit() {
    this.loading = 0;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this._matomoService.setupTracking('Core | Settings | Profile');
    this._matomoService.setCustomVariable('apiCalls', this.loadingExpected.toString(), 'page');

    this.nameFormGroup = this._formBuilder.group({
      firstNameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
      avatarCtrl: ['']
    });
    this.bodyFormGroup = this._formBuilder.group({
      dateOfBirthCtrl: ['', Validators.required]
    });
    this.emailFormGroup = this._formBuilder.group({
      emailCtrl: ['', Validators.email]
    });

    this.apiService.getProfileValues().subscribe((data) => {
      this.nameFormGroup.setValue({
        firstNameCtrl: data['firstName'],
        lastNameCtrl: data['lastName'],
        avatarCtrl: data['avatar']
      });
      this.bodyFormGroup.setValue({
        dateOfBirthCtrl: data['dateOfBirth']
      });
      this.emailFormGroup.setValue({
        emailCtrl: data['email']
      });

      this.loadingData = false;
      this.emitApiLoaded();
    });
  }

  onSubmit() {
    console.log('Submitted');
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.nameFormGroup.invalid || this.bodyFormGroup.invalid || this.emailFormGroup.invalid) {
      return;
    }

    this.loadingFormResponce = true;
    this.apiService.saveProfileValues(
      this.nameGroupControls.firstNameCtrl.value,
      this.nameGroupControls.lastNameCtrl.value,
      this.bodyGroupControls.dateOfBirthCtrl.value,
      this.emailGroupControls.emailCtrl.value,
      this.nameGroupControls.avatarCtrl.value
    ).pipe(first())
      .subscribe(
        data => {
          console.log('Saved');
          this.loadingFormResponce = false;
        },
        error => {
          this.alertService.error(error);
          this.loadingFormResponce = false;
        });
  }

  private emitApiLoaded() {
    this.loading++;
    if (this.loading >= this.loadingExpected) {
      this._matomoService.doTracking();
    }
  }

}
