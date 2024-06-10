import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardShopComponent } from './onboard-shop-list/onboard-shop-list.component';
import { OnboardShopBulkUploadComponent } from './onboard-shop-bulk-upload/onboard-shop-bulk-upload.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { CoreModule } from 'src/app/core/core.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OnboardShopRoutingModule } from './onboard-shop-routing.module';
import { UploadService } from '@services/uploadService/upload.service';
import { OnboardShopFormComponent } from './onboard-shop-form/onboard-shop-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { OnboardShopDataComponent } from './onboard-shop-data/onboard-shop-data.component';
import { OnboardInvalidShopComponent } from './onboard-invalid-shop/onboard-invalid-shop.component';

@NgModule({
  declarations: [
    OnboardShopComponent,
    OnboardShopBulkUploadComponent,
    OnboardShopFormComponent,
    OnboardShopDataComponent,
    OnboardInvalidShopComponent
  ],
  imports: [
    CommonModule,
    OnboardShopRoutingModule,
    NgxSpinnerModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    CoreModule.forRoot(),
  ],
  providers: [UploadService]

})
export class OnboardShopModule { }
