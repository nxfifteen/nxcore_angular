import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

// Components Routing
import { WeightComponent } from './weight.component';
import { BodyRoutingModule } from './body-routing.module';

@NgModule({
  imports: [
    BodyRoutingModule,
    ChartsModule
  ],
  declarations: [ WeightComponent ]
})
export class BodyModule { }
