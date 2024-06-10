import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentTransactionListComponent } from './payment-transaction-list/payment-transaction-list.component';
import { PaymentTransactionRoutingModule } from './payment-transaction-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    PaymentTransactionListComponent
  ],
  imports: [
    CommonModule,PaymentTransactionRoutingModule,NgxSpinnerModule,CoreModule.forRoot(),NgbModule
  ]
})
export class PaymentTransactionModule { }
