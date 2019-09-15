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
        path: 'icons',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      }
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
