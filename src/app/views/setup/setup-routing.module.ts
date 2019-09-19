import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstrunComponent } from './firstrun.component';
import {AuthWithFitbitComponent} from './auth-with-fitbit.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Setup'
    },
    children: [
      {
        path: '',
        redirectTo: 'profile'
      },
      {
        path: 'profile',
        component: FirstrunComponent,
        data: {
          title: 'First Run'
        }
      },
      {
        path: 'fitbit',
        component: AuthWithFitbitComponent,
        data: {
          title: 'Auth With Fitbit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule {}
