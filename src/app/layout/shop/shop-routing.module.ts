import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopFormComponent } from './shop-form/shop-form.component';
import { ShopsViewComponent } from './shops-view/shops-view.component';
import { ShopsSubscriptionComponent } from './shops-subscription/shops-subscription.component';
import { ShopCatalogueListComponent } from './shop-catalogue-list/shop-catalogue-list.component';
import { ShopCatalogueFormComponent } from './shop-catalogue-form/shop-catalogue-form.component';
import { KycDocumentComponent } from './kyc-document/kyc-document.component';
import { ShopFavoritesListComponent } from './shop-favorites-list/shop-favorites-list.component';
import { ShopScheduleFormComponent } from './shop-schedule-form/shop-schedule-form.component';
import { ShopScheduleListComponent } from './shop-schedule-list/shop-schedule-list.component';
import { GuestShopComponent } from './guest-shop/guest-shop.component';
import { ShopEmployeeListComponent } from './shop-employee-list/shop-employee-list.component';
import { ShopEmployeeFormComponent } from './shop-employee-form/shop-employee-form.component';
import { ShopDeviceInfoComponent } from './shop-device-info/shop-device-info.component';
import { BankDetailComponent } from './bank-detail/bank-detail.component';
import { ShopGroupListComponent } from './shop-group-list/shop-group-list.component';
const userRoutes: Routes = [


  { path: '', redirectTo: 'shop-list', pathMatch: 'full' },
  { path: 'shop-list', component: ShopListComponent },
  {
    path: '', component: ShopsViewComponent,
    children: [
      { path: 'shop-catalogue-list', component: ShopCatalogueListComponent },
      { path: 'shop-form', component: ShopFormComponent },
      { path: 'subscription', component: ShopsSubscriptionComponent },
      { path: 'shop-catalogue-form', component: ShopCatalogueFormComponent },
      { path: 'shop-kyc', component: KycDocumentComponent },
      { path: 'favorites', component: ShopFavoritesListComponent },
      { path: 'shop-schedule-form', component: ShopScheduleFormComponent },
      { path: 'shop-schedule-list', component: ShopScheduleListComponent },
      { path: 'guest-shop', component: GuestShopComponent },
      { path: 'shop-employee-list', component: ShopEmployeeListComponent },
      { path: 'shop-employee-form', component: ShopEmployeeFormComponent },
      { path: 'device-info', component: ShopDeviceInfoComponent },
      { path: 'bank-detail', component: BankDetailComponent },
      { path: 'list', component: ShopGroupListComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class ShopRoutingModule { }
