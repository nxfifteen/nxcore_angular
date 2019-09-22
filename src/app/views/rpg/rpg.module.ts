import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
// Components Routing
import {PvpComponent} from './pvp.component';
import {LeaderboardComponent} from './leaderboard.component';
import {RpgRoutingModule} from './rpg-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RpgRoutingModule,
    ProgressbarModule.forRoot(),
  ],
  declarations: [PvpComponent, LeaderboardComponent]
})
export class RpgModule {
}
