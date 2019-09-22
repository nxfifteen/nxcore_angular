import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PvpComponent} from './pvp.component';
import {LeaderboardComponent} from './leaderboard.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'PVP'
    },
    children: [
      {
        path: '',
        redirectTo: 'leaderboard'
      },
      {
        path: 'leaderboard',
        component: LeaderboardComponent,
        data: {
          title: 'Leaderboard'
        }
      },
      {
        path: 'challenges',
        component: PvpComponent,
        data: {
          title: '1:1 Challenges'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RpgRoutingModule {}
