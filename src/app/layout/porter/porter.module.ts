import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { PorterRoutingModule } from './porter-routing.module';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxFileDropModule } from 'ngx-file-drop';
import { PorterListComponent } from './porter-list/porter-list.component';
import { PorterFormComponent } from './porter-form/porter-form.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    PorterListComponent,
    PorterFormComponent,
    CustomerOrderComponent,
    OrderViewComponent
  ],
  imports: [
    PorterRoutingModule,
    CommonModule,
    NgxSpinnerModule, NgxFileDropModule,
    NgSelectModule,
    NgbModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule.forRoot()
  ],

})
export class PorterModule { }
