import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
// Components Routing
import {AwardsComponent} from './awards.component';
import {AchivementsRoutingModule} from './achivements-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AwardsDetailComponent} from './awards_detail.component';
import {TooltipModule} from 'ngx-bootstrap';
// import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AchivementsRoutingModule,
    ProgressbarModule.forRoot(),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
  ],
  declarations: [AwardsComponent, AwardsDetailComponent]
})
export class AchivementsModule {
}
