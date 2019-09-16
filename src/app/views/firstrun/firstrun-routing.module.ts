import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstrunComponent } from './firstrun.component';

const routes: Routes = [
  {
    path: '',
    component: FirstrunComponent,
    data: {
      title: 'Setup'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstrunRoutingModule {}
