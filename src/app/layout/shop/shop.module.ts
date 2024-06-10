import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopFormComponent } from './shop-form/shop-form.component';
import { ShopRoutingModule } from './shop-routing.module';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { UploadService } from '@services/uploadService/upload.service';
import { QRCodeModule } from 'angularx-qrcode';
import { NgSelectModule } from '@ng-select/ng-select';
import { ShopsViewComponent } from './shops-view/shops-view.component';
import { ShopsSubscriptionComponent } from './shops-subscription/shops-subscription.component';
import { ShopCatalogueListComponent } from './shop-catalogue-list/shop-catalogue-list.component';
import { ShopCatalogueFormComponent } from './shop-catalogue-form/shop-catalogue-form.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { KycDocumentComponent } from './kyc-document/kyc-document.component';
import { ShopFavoritesListComponent } from './shop-favorites-list/shop-favorites-list.component';
import { ShopScheduleFormComponent } from './shop-schedule-form/shop-schedule-form.component';
import { ShopScheduleListComponent } from './shop-schedule-list/shop-schedule-list.component';
import { SharedModule } from '../../shared/shared.module';
import { GuestShopComponent } from './guest-shop/guest-shop.component';
import { ShopEmployeeListComponent } from './shop-employee-list/shop-employee-list.component';
import { ShopEmployeeFormComponent } from './shop-employee-form/shop-employee-form.component';
import { FormsModule } from '@angular/forms';
import { ShopDeviceInfoComponent } from './shop-device-info/shop-device-info.component';
import { ShopsSubscriptionPlanComponent } from "./shops-subscription-plan/shops-subscription-plan.component";
import { BankDetailComponent } from './bank-detail/bank-detail.component';
import { ShopGroupListComponent } from './shop-group-list/shop-group-list.component';
import { ShopGroupInfoComponent } from './shop-group-info/shop-group-info.component';
@NgModule({
  declarations: [
    ShopListComponent,
    ShopFormComponent,
    ShopsViewComponent,
    ShopsSubscriptionComponent,
    ShopCatalogueListComponent,
    ShopCatalogueFormComponent,
    KycDocumentComponent,
    ShopFavoritesListComponent,
    ShopScheduleFormComponent,
    ShopScheduleListComponent,
    GuestShopComponent,
    ShopEmployeeListComponent,
    ShopEmployeeFormComponent,
    ShopDeviceInfoComponent,
    ShopsSubscriptionPlanComponent,
    BankDetailComponent,
    ShopGroupListComponent,
    ShopGroupInfoComponent
  ],
  imports: [
    ShopRoutingModule,
    SharedModule,
    FormsModule,
    NgxFileDropModule,
    CoreModule.forRoot(),
    GoogleMapsModule,
    NgSelectModule,
    QRCodeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAp92DF5Vk3CokhTVKskaGA174iSX7o2Cs',
      libraries: ['places']
    })],
  providers: [UploadService]
})
export class ShopModule { }
