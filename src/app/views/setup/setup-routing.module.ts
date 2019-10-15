import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SettingsProfileComponent} from './profile.component';
import {AuthWithFitbitComponent} from './auth-with-fitbit.component';
import {AccountLinkComponent} from './accountlink.component';

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
        component: SettingsProfileComponent,
        data: {
          title: 'First Run'
        }
      }
    ]
  },
  {
    path: 'oauth',
    data: {
      title: 'OAuth'
    },
    children: [
      {
        path: '',
        redirectTo: 'select'
      },
      {
        path: 'select',
        component: AccountLinkComponent,
        data: {
          title: 'Select Your Account'
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
