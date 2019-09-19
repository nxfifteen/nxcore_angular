import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../_services';
import {ApiService} from '../../services/api.service';
import {environment} from '../../../environments/environment';
import {first, map} from 'rxjs/operators';

@Component({
  templateUrl: './firstrun.component.html',
  styleUrls: ['./firstrun.component.scss']
})
export class FirstrunComponent implements OnInit {
  nameFormGroup: FormGroup;
  bodyFormGroup: FormGroup;
  emailFormGroup: FormGroup;

  loading = false;
  loadingData = true;
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
              private alertService: AlertService,
              private apiService: ApiService) {
  }

  ngOnInit() {
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

    this.loading = true;
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
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
