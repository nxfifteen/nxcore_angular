import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

// Components Routing
import { ActivityComponent } from './activity.component';
import { ActivitiesRoutingModule } from './activities-routing.module';
import {ActivityLogComponent} from './activity_log.component';
import {CommonModule} from '@angular/common';
import {AlertModule, ProgressbarModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    ActivitiesRoutingModule,
    ChartsModule,
    ProgressbarModule.forRoot(),
    AlertModule.forRoot(),
    CommonModule
  ],
  declarations: [ ActivityComponent, ActivityLogComponent ]
})
export class ActivitiesModule { }
