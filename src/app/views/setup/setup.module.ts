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
import {SettingsProfileComponent} from './profile.component';
import {SetupRoutingModule} from './setup-routing.module';
import {AuthWithFitbitComponent} from './auth-with-fitbit.component';
import {AlertModule} from 'ngx-bootstrap';
import {AccountLinkComponent} from './accountlink.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    ReactiveFormsModule,
    SetupRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ProgressbarModule.forRoot(),
    ButtonsModule.forRoot(),
    FontAwesomeModule,
    AlertModule.forRoot(),
  ],
  declarations: [SettingsProfileComponent, AccountLinkComponent, AuthWithFitbitComponent]
})
export class SetupModule {
}
