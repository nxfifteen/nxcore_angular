import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BucketisoComponent } from './bucketiso.component';
import { FontawsomeComponent } from './fontawsome.component';
import { NomieComponent } from './nomie.component';
import { SimeplelineComponent } from './simepleline.component';
import { ColorsComponent } from './colors.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Icons'
    },
    children: [
      {
        path: '',
        redirectTo: 'colors'
      },
      {
        path: 'colors',
        component: ColorsComponent,
        data: {
          title: 'Colours'
        }
      },
      {
        path: 'bucketiso',
        component: BucketisoComponent,
        data: {
          title: 'Bucket ISO'
        }
      },
      {
        path: 'fontawsome',
        component: FontawsomeComponent,
        data: {
          title: 'Fontawsome'
        }
      },
      {
        path: 'nomie',
        component: NomieComponent,
        data: {
          title: 'Nomie'
        }
      },
      {
        path: 'simple-line-icons',
        component: SimeplelineComponent,
        data: {
          title: 'Simple Line Icons'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconsRoutingModule {}
