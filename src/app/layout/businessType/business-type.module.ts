import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { BusinessTypeRoutingModule } from './business-type-routing.module';
import { BusinessTypeFormComponent } from './business-type-form/business-type-form.component';
import { BusinessTypeListComponent } from './business-type-list/business-type-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { UploadService } from '@services/uploadService/upload.service';


@NgModule({
  declarations: [
    BusinessTypeFormComponent,
    BusinessTypeListComponent,
    
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    NgbModule,
    FormsModule,
    CoreModule.forRoot(),
    ReactiveFormsModule,
    NgxFileDropModule,
    BusinessTypeRoutingModule,
    CoreModule.forRoot()],
    providers:[UploadService]
})
export class BusinessTypeModule {}
