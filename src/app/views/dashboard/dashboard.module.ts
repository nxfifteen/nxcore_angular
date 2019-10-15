import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
// Components Routing
import {DashboardComponent} from './dashboard.component';
import {AlertModule} from 'ngx-bootstrap';
import {WelcomeComponent} from './welcome.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    AlertModule.forRoot(),
    ProgressbarModule.forRoot(),
    ButtonsModule.forRoot(),
    FontAwesomeModule
  ],
  declarations: [DashboardComponent, WelcomeComponent]
})
export class DashboardModule { }
