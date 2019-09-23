import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
// Components Routing
import {PvpComponent} from './pvp.component';
import {LeaderboardComponent} from './leaderboard.component';
import {RpgRoutingModule} from './rpg-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RpgRoutingModule,
    ProgressbarModule.forRoot(),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [PvpComponent, LeaderboardComponent]
})
export class RpgModule {
}
