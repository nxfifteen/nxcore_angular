import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PrivacyPolicyComponent} from './privacypolicy.component';
import {TermsOfServiceComponent} from './termsservice.component';
import {PatreonComponent} from './patreon.component';
import {PatreonThanksComponent} from './patreonthanks.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Help'
    },
    children: [
      {
        path: '',
        redirectTo: 'privacy'
      },
      {
        path: 'privacy',
        component: PrivacyPolicyComponent,
        data: {
          title: 'Privacy Policy'
        }
      },
      {
        path: 'terms',
        component: TermsOfServiceComponent,
        data: {
          title: 'Terms of Service'
        }
      },
      {
        path: 'patreon',
        data: {
          title: 'Patreon'
        },
        children: [
          {
            path: '',
            component: PatreonComponent,
          },
          {
            path: 'thanks',
            component: PatreonThanksComponent,
            data: {
              title: 'Thanks'
            }
          },
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocsRoutingModule {
}
