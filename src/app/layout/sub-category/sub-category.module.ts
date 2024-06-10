import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoryFormComponent } from './sub-category-form/sub-category-form.component';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { UploadService } from '@services/uploadService/upload.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxFileDropModule } from 'ngx-file-drop';


@NgModule({
  declarations: [
    SubCategoryFormComponent,
    SubCategoryListComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    NgbModule,
    NgSelectModule,NgxFileDropModule,
    FormsModule,
    ReactiveFormsModule,
    SubCategoryRoutingModule,
    CoreModule.forRoot(),
  ],
  providers:[UploadService]
})
export class SubCategoryModule { }
