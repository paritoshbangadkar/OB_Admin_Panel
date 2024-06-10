import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InAppAdModalFormComponent } from './in-app-ad-modal-form/in-app-ad-modal-form.component';
import { InAppAdModalListComponent } from './in-app-ad-modal-list/in-app-ad-modal-list.component';
import { InAppAdModalRoutingModule } from './in-app-ad-modal-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreModule } from 'src/app/core/core.module';
import { UploadService } from '@services/uploadService/upload.service';

@NgModule({
  declarations: [
    InAppAdModalFormComponent,
    InAppAdModalListComponent
  ],
  imports: [
    CommonModule,
    InAppAdModalRoutingModule,
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
export class InAppAdModalModule { }
