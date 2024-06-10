import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdvertiseListComponent } from './advertise-list/advertise-list.component';
import { AdvertiseFormComponent } from './advertise-form/advertise-form.component';

const userRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Advertise',
    },
    children: [
      {
        path: '',
        redirectTo: 'advertise-list',
      },
      {
        path: 'advertise-list',
        component: AdvertiseListComponent,
        data: {
          title: 'Advertise List',
        },
      },
      {
        path: 'advertise-form',
        component: AdvertiseFormComponent,
        data: {
          title: 'Advertise Form',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class AdvertiseRoutingModule {}
