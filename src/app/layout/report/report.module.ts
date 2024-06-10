import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportRoutingModule } from './report-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreModule } from 'src/app/core/core.module';
import { OrderChatComponent } from './order-chat/order-chat.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@NgModule({
  declarations: [ReportListComponent, OrderChatComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    NgxSpinnerModule,
    NgxFileDropModule,
    NgSelectModule,
    NgbModule,
    CoreModule.forRoot(),
    InfiniteScrollModule,
  ],
})
export class ReportModule {}
