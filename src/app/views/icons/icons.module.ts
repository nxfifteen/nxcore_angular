import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import {IconsRoutingModule } from './icons-routing.module';

// Components Routing
import { BucketisoComponent } from './bucketiso.component';
import { FontawsomeComponent } from './fontawsome.component';
import { NomieComponent } from './nomie.component';
import { SimeplelineComponent } from './simepleline.component';
import { ColorsComponent } from './colors.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ProgressbarModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  declarations: [
    BucketisoComponent,
    FontawsomeComponent,
    NomieComponent,
    SimeplelineComponent,
    ColorsComponent
  ]
})
export class IconsModule { }
