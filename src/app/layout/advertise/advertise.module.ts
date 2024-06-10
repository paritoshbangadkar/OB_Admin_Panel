import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { AdvertiseFormComponent } from './advertise-form/advertise-form.component';
import { AdvertiseListComponent } from './advertise-list/advertise-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { AdvertiseRoutingModule } from './advertise-routing.module';
import {UploadService} from 'src/app/services/uploadService/upload.service'
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    AdvertiseFormComponent,
    AdvertiseListComponent
  ],
  imports: [
    CommonModule,
    AdvertiseRoutingModule,
    NgxSpinnerModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    NgSelectModule,
    CoreModule.forRoot()
  ],
  providers:[UploadService]
})
export class AdvertiseModule { }
