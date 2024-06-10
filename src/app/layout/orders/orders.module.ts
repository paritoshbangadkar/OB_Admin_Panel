import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderViewComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    NgxSpinnerModule, NgxFileDropModule,
    NgSelectModule,
    NgbModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule.forRoot()
  ]
})
export class OrdersModule { }
