import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

// Components Routing
import { WeightComponent } from './weight.component';
import { BodyRoutingModule } from './body-routing.module';
import {AlertModule, ProgressbarModule} from 'ngx-bootstrap';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    BodyRoutingModule,
    AlertModule.forRoot(),
    ProgressbarModule.forRoot(),
    ChartsModule,
    CommonModule
  ],
  declarations: [ WeightComponent ]
})
export class BodyModule { }
