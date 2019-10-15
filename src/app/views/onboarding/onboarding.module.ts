import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
// Components Routing
import {MyMaterialModule} from '../../material-module';
import {BasicProfileComponent} from './basicprofile.component';
import {OnboardingRoutingModule} from './onboarding-routing.module';
import {AlertModule} from 'ngx-bootstrap';
import {AccountLinkComponent} from './accountlink.component';
import {AuthWithFitbitComponent} from './auth-with-fitbit.component';
import {AuthWithGoogleComponent} from './auth-with-google.component';
import {AuthWithSamsungComponent} from './auth-with-samsung.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    ReactiveFormsModule,
    OnboardingRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ProgressbarModule.forRoot(),
    ButtonsModule.forRoot(),
    FontAwesomeModule,
    AlertModule.forRoot(),
  ],
  declarations: [BasicProfileComponent, AccountLinkComponent, AuthWithFitbitComponent, AuthWithGoogleComponent, AuthWithSamsungComponent]
})
export class OnboardingModule {
}
