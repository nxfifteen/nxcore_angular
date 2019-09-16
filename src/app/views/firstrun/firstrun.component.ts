import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../_services';

@Component({
  templateUrl: './firstrun.component.html',
  styleUrls: ['./firstrun.component.scss']
})
export class FirstrunComponent implements OnInit {
  nameFormGroup: FormGroup;
  bodyFormGroup: FormGroup;
  emailFormGroup: FormGroup;

  loading = false;
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
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.nameFormGroup = this._formBuilder.group({
      firstNameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
    });
    this.bodyFormGroup = this._formBuilder.group({
      dateOfBirthCtrl: ['', Validators.required],
      heightCtrl: ['', Validators.required],
    });
    this.emailFormGroup = this._formBuilder.group({
      emailCtrl: ['', Validators.email]
    });
  }

  onSubmit() {
    console.log('Subnmitted');
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.nameFormGroup.invalid || this.emailFormGroup.invalid) {
      return;
    }

    this.loading = true;

    console.log(this.nameGroupControls.firstNameCtrl.value);
    console.log(this.nameGroupControls.lastNameCtrl.value);
  }

}
