import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

// Components Routing
import { WeightComponent } from './weight.component';
import { BodyRoutingModule } from './body-routing.module';
import {AlertModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    BodyRoutingModule,
    AlertModule.forRoot(),
    ChartsModule
  ],
  declarations: [ WeightComponent ]
})
export class BodyModule { }
