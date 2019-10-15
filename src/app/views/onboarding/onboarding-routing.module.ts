import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BasicProfileComponent} from './basicprofile.component';
import {AccountLinkComponent} from './accountlink.component';
import {AuthWithFitbitComponent} from './auth-with-fitbit.component';
import {AuthWithGoogleComponent} from './auth-with-google.component';
import {AuthWithSamsungComponent} from './auth-with-samsung.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'On Boarding'
    },
    children: [
      {
        path: '',
        redirectTo: 'profile'
      },
      {
        path: 'profile',
        component: BasicProfileComponent,
        data: {
          title: 'About You'
        }
      },
      {
        path: 'link',
        component: AccountLinkComponent,
        data: {
          title: 'Link Your Account'
        }
      },
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
        redirectTo: 'link'
      },
      {
        path: 'fitbit',
        component: AuthWithFitbitComponent,
        data: {
          title: 'Auth With Fitbit'
        }
      },
      {
        path: 'google',
        component: AuthWithGoogleComponent,
        data: {
          title: 'Auth With Google Fit'
        }
      },
      {
        path: 'samsung-health',
        component: AuthWithSamsungComponent,
        data: {
          title: 'Auth With Samsung Health'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule {
}
