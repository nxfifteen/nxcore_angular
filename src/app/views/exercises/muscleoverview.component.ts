import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AlertService, AuthenticationService} from '../../_services';
import {ApiService} from '../../services/api.service';
import {User} from '../../_models';
import {Router} from '@angular/router';
import {MatomoService} from '../../services/matomo.service';
import {ExercisesCategories} from '../../_models/exercisesCategories';

@Component({
  templateUrl: './muscleoverview.component.html'
})
export class MuscleOverviewComponent implements OnInit {
  loading: number;
  loadingExpected: number;
  currentUser: User;
  exerciseMetaData: Array<ExercisesCategories>;

  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private apiService: ApiService,
              public _matomoService: MatomoService) {
    this.loading = 0;
    this.loadingExpected = 1;
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (this.currentUser.firstrun) {
      this.router.navigate(['/onboarding']);
    } else {
      this._matomoService.setupTracking('Core | Exercise Muscle Overview');
      this._matomoService.setCustomVariable('apiCalls', this.loadingExpected.toString(), 'page');
      this.loadFromApi();
    }
  }

  pullToRefresh(): void {
    this._matomoService.trackEvent('core', 'api', 'cache', 0);
    this.buildViewContent(true);
  }

  loadFromApi(): void {
    this._matomoService.trackEvent('core', 'api', 'cache', 1);
    this.buildViewContent(false);
  }

  buildViewContent(bustCache?: boolean): void {
    this.loading = 0;
    this.loadingExpected = 1;

    this.apiService.getExercisesMuscleOverview(bustCache).subscribe((data) => {
      this.exerciseMetaData = data;
      this.emitApiLoaded();
    });
  }

  private emitApiLoaded() {
    this.loading++;
    if (this.loading >= this.loadingExpected) {
      this._matomoService.doTracking();
    }
  }

}
