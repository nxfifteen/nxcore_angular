import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
// Components Routing
import {PvpComponent} from './pvp.component';
import {LeaderboardComponent} from './leaderboard.component';
import {RpgRoutingModule} from './rpg-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChallengeDetailComponent} from './challenge_detail.component';
import {BodyRoutingModule} from '../body/body-routing.module';
import {ChartsModule} from 'ng2-charts';
import {AlertModule, TooltipModule} from 'ngx-bootstrap';
// import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    RpgRoutingModule,
    ProgressbarModule.forRoot(),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [PvpComponent, LeaderboardComponent, ChallengeDetailComponent]
})
export class RpgModule {
}
