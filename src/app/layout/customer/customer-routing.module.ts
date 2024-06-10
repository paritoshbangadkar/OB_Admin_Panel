import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { DeviceInfoComponent } from './device-info/device-info.component';
const userRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Customer',
    },
    children: [
      {
        path: '',
        redirectTo: 'customer-list',
      },
      {
        path: 'customer-list',
        component: CustomerListComponent,
        data: {
          title: 'Customer List',
        },
      },
      {
        path: 'customer-form',
        component: CustomerFormComponent,
        data: {
          title: 'Customer Form',
        },
      },
      {
        path: 'device-info',
        component: DeviceInfoComponent,
        data: {
          title: 'Device Info',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
