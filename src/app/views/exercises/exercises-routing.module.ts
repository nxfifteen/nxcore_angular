import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {OverviewComponent} from './overview.component';
import {MuscleOverviewComponent} from './muscleoverview.component';
import {EquipmentOverviewComponent} from './equipmentoverview.component';
import {CategoryOverviewComponent} from './categoryoverview.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Exercises'
    },
    children: [
      {
        path: '',
        redirectTo: 'overview'
      },
      {
        path: 'overview',
        component: OverviewComponent,
        data: {
          title: 'Exercise Overview'
        }
      },
      {
        path: 'muscle',
        data: {
          title: 'muscle'
        },
        children: [
          {
            path: '',
            redirectTo: 'overview'
          },
          {
            path: 'overview',
            component: MuscleOverviewComponent,
            data: {
              title: 'muscle Overview'
            }
          },
        ]
      },
      {
        path: 'equipment',
        data: {
          title: 'equipment'
        },
        children: [
          {
            path: '',
            redirectTo: 'overview'
          },
          {
            path: 'overview',
            component: EquipmentOverviewComponent,
            data: {
              title: 'equipment Overview'
            }
          },
        ]
      },
      {
        path: 'category',
        data: {
          title: 'category'
        },
        children: [
          {
            path: '',
            redirectTo: 'overview'
          },
          {
            path: 'overview',
            component: CategoryOverviewComponent,
            data: {
              title: 'category Overview'
            }
          },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule {
}
