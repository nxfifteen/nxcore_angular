import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ActivityComponent} from './activity.component';
import {ActivityLogComponent} from './activity_log.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Activities'
    },
    children: [
      {
        path: '',
        redirectTo: 'activity'
      },
      {
        path: 'activity',
        component: ActivityComponent,
        data: {
          title: 'Activity Tracker'
        }
      },
      {
        path: 'log',
        component: ActivityLogComponent,
        data: {
          title: 'Activity Log'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule {}
