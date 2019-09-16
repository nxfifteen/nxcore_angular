import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService, AuthenticationService} from '../_services';

import {MustMatch, ValidInvite} from '../_helper';
import {HttpClient} from '@angular/common/http';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      invite: ['', [Validators.required, Validators.minLength(8)]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    }, {
      validator: [
        MustMatch('password', 'passwordConfirm')
      ]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log('hiya');
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.register(
      this.f.username.value,
      this.f.password.value,
      this.f.passwordConfirm.value,
      this.f.email.value,
      this.f.invite.value
    ).pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
