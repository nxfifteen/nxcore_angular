import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ActivityComponent} from './activity.component';
import {ActivityLogComponent} from './activity_log.component';
import {ActivityLogDetailsComponent} from './activity_log_details.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Activities'
    },
    children: [
      {
        path: '',
        redirectTo: 'tracker'
      },
      {
        path: 'tracker',
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
      },
      {
        path: 'activity/:id',
        component: ActivityLogDetailsComponent,
        data: {
          title: 'Activity Details'
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
