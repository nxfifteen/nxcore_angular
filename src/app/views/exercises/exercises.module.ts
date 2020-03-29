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
import {ExercisesRoutingModule} from './exercises-routing.module';
import {AlertModule} from 'ngx-bootstrap';
import {OverviewComponent} from './overview.component';
import {MuscleOverviewComponent} from './muscleoverview.component';
import {EquipmentOverviewComponent} from './equipmentoverview.component';
import {CategoryOverviewComponent} from './categoryoverview.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    ReactiveFormsModule,
    ExercisesRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ProgressbarModule.forRoot(),
    ButtonsModule.forRoot(),
    FontAwesomeModule,
    AlertModule.forRoot(),
  ],
  declarations: [OverviewComponent, MuscleOverviewComponent, EquipmentOverviewComponent, CategoryOverviewComponent]
})
export class ExercisesModule {
}
