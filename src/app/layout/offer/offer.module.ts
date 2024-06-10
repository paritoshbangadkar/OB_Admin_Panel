import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferFormComponent } from './offer-form/offer-form.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { OfferRoutingModule } from './offer-routing.module';
import { UploadService } from '@services/uploadService/upload.service';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    OfferFormComponent,
    OfferListComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    OfferRoutingModule,
    NgxFileDropModule,
    NgSelectModule,
    CoreModule.forRoot(),
  ],
  providers:[UploadService]
})
export class OfferModule { }
