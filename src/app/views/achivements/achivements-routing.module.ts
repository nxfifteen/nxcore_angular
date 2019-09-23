import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AwardsComponent} from './awards.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Achivements'
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AchivementsRoutingModule {}
