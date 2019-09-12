import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {WeightComponent} from './weight.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Body'
    },
    children: [
      {
        path: '',
        redirectTo: 'weight'
      },
      {
        path: 'weight',
        component: WeightComponent,
        data: {
          title: 'Weight'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodyRoutingModule {}
