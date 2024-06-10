import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { CustomerRoutingModule } from './customer-routing.module';
import {CustomerFormComponent} from './customer-form/customer-form.component';
import {CustomerListComponent} from './customer-list/customer-list.component';
import { UploadService } from '@services/uploadService/upload.service';
import { NgxFileDropModule } from 'ngx-file-drop';
import { AddressListComponent } from './address-list/address-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DeviceInfoComponent } from './device-info/device-info.component';

@NgModule({
  declarations: [
    CustomerFormComponent,
    CustomerListComponent,
    AddressListComponent,
    DeviceInfoComponent
  ],

  imports: [
    NgxFileDropModule,
    CustomerRoutingModule,
    NgSelectModule,
    CoreModule.forRoot()
  ],
  providers:[UploadService]
})
export class CustomerModule {}
