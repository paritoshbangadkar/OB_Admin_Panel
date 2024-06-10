import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationFormComponent } from './notification-form/notification-form.component';
import { NotificationRoutingModule } from './notification-routing.module';
import { UploadService } from '@services/uploadService/upload.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [NotificationFormComponent, NotificationListComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationRoutingModule,
    NgxFileDropModule,
    NgSelectModule,
    CoreModule.forRoot(),
  ],
  providers: [UploadService]
})
export class NotificationModule { }
