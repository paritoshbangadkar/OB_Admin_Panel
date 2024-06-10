import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeletedBusinessListComponent } from './deleted-business-list/deleted-business-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxFileDropModule } from 'ngx-file-drop';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CoreModule } from 'src/app/core/core.module';
import { DeletedBusinessRoutingModule } from 'src/app/layout/deleted-business/deleted-business-routing.module'
@NgModule({
  declarations: [
    DeletedBusinessListComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    NgxFileDropModule,
    NgSelectModule,
    NgbModule,
    CoreModule.forRoot(),
    InfiniteScrollModule,
    DeletedBusinessRoutingModule
  ]
})
export class DeletedBusinessModule { }
