import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AwardsComponent} from './awards.component';
import {AwardsDetailComponent} from './awards_detail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Achievements'
    },
    children: [
      {
        path: '',
        redirectTo: 'awards'
      },
      {
        path: 'awards',
        component: AwardsComponent,
        data: {
          title: 'Awards'
        }
      },
      {
        path: 'awards/info/:id',
        component: AwardsDetailComponent,
        data: {
          title: 'Awards Details'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AchievementsRoutingModule {}
