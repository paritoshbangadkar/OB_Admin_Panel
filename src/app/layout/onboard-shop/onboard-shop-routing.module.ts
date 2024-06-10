import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OnboardShopComponent } from './onboard-shop-list/onboard-shop-list.component';
import { OnboardShopFormComponent } from './onboard-shop-form/onboard-shop-form.component';
import { OnboardShopDataComponent } from './onboard-shop-data/onboard-shop-data.component';
import { OnboardInvalidShopComponent } from './onboard-invalid-shop/onboard-invalid-shop.component';
const userRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Onboard Business',
    },
    children: [
      {
        path: '',
        redirectTo: 'onboard-shop-list',
      },
      {
        path: 'onboard-shop-list',
        component: OnboardShopComponent,
        data: {
          title: 'Onboard Business List',
        },
      },
      {
        path: 'onboard-shop-form',
        component: OnboardShopFormComponent,
        data: {
          title: 'Onboard Business Form',
        },
      },
      {
        path: 'onboard-shop-data',
        component: OnboardShopDataComponent,
        data: {
          title: 'Onboard Business Data',
        },
      },
      {
        path: 'invalid-shop',
        component: OnboardInvalidShopComponent,
        data: {
          title: 'Incomplete Business Data',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class OnboardShopRoutingModule { }
