import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// Import Containers
import {DefaultLayoutComponent} from './containers';
import {LoginComponent, RegisterComponent} from './login';

import {AuthGuard} from './_helper';

export const routes: Routes = [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
      path: 'onboarding',
      loadChildren: () => import('./views/onboarding/onboarding.module').then(m => m.OnboardingModule)
    },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    },
  },
    {
      path: 'register',
      component: RegisterComponent,
      data: {
        title: 'Register'
      },
    },
    {
      path: '',
      component: DefaultLayoutComponent,
      data: {
        title: 'Home'
      },
      children: [
        {
          path: 'dashboard',
          canActivate: [AuthGuard],
          loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
        },
        {
          path: 'body',
          canActivate: [AuthGuard],
          loadChildren: () => import('./views/body/body.module').then(m => m.BodyModule)
        },
        {
          path: 'rpg',
          canActivate: [AuthGuard],
          loadChildren: () => import('./views/rpg/rpg.module').then(m => m.RpgModule)
        },
        {
          path: 'icons',
          canActivate: [AuthGuard],
          loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
        },
        {
          path: 'setup',
          canActivate: [AuthGuard],
          loadChildren: () => import('./views/setup/setup.module').then(m => m.SetupModule)
        },
        {
          path: 'achievements',
          canActivate: [AuthGuard],
          loadChildren: () => import('./views/achivements/achivements.module').then(m => m.AchievementsModule)
        },
        {
          path: 'activities',
          canActivate: [AuthGuard],
          loadChildren: () => import('./views/activities/activities.module').then(m => m.ActivitiesModule)
        },
        {
          path: 'help',
          loadChildren: () => import('./views/docs/docs.module').then(m => m.DocsModule)
        },
      ]
    }
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
