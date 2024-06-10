import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadService } from '@services/uploadService/upload.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxFileDropModule } from 'ngx-file-drop';
import { CategoryAdvertiseListComponent } from './category-advertise-list/category-advertise-list.component';
import { CategoryOfferListComponent } from './category-offer-list/category-offer-list.component';
import { CategoryDealsListComponent } from './category-deals-list/category-deals-list.component';

@NgModule({
  declarations: [
    CategoryFormComponent,
    CategoryListComponent,
    CategoryAdvertiseListComponent,
    CategoryOfferListComponent,
    CategoryDealsListComponent,
  ],
  imports: [
    CategoryRoutingModule,
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
export class CategoryModule {}
