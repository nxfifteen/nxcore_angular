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
import {ChartsModule} from 'ng2-charts';
import {AlertModule, CollapseModule, TooltipModule} from 'ngx-bootstrap';
import {PveComponent} from './pve.component';

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
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [PvpComponent, PveComponent, LeaderboardComponent, ChallengeDetailComponent]
})
export class RpgModule {
}
