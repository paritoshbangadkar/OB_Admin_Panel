import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { SeasonalOfferRoutingModule } from './seasonal-offer-routing.module';
import { SeasonalOfferFormComponent } from './seasonal-offer-form/seasonal-offer-form.component';
import { SeasonalOfferListComponent } from './seasonal-offer-list/seasonal-offer-list.component';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxFileDropModule } from 'ngx-file-drop';
import { UploadService } from '@services/uploadService/upload.service';


@NgModule({
  declarations: [
    SeasonalOfferFormComponent,
    SeasonalOfferListComponent,
  ],
  imports: [
    SeasonalOfferRoutingModule,
    CommonModule,
    NgxSpinnerModule,NgxFileDropModule,
    NgSelectModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
     CoreModule.forRoot()

    ],
  
    providers:[UploadService]
})
export class  SeasonalOfferModule {}
