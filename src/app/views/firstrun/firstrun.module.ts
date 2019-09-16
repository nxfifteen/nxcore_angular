import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components Routing
import { FirstrunComponent } from './firstrun.component';
import { FirstrunRoutingModule } from './firstrun-routing.module';
import {MyMaterialModule} from '../../material-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    ReactiveFormsModule,
    FirstrunRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ProgressbarModule.forRoot(),
    ButtonsModule.forRoot(),
    FontAwesomeModule,
  ],
  declarations: [ FirstrunComponent ]
})
export class FirstrunModule { }
