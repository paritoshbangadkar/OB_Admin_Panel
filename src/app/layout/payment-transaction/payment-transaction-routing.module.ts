import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PaymentTransactionListComponent } from './payment-transaction-list/payment-transaction-list.component';

const collegeRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Transaction',
    },
    children: [
      {
        path: '',
        redirectTo: 'transaction-list',
      },
      {
        path: 'transaction-list',
        component: PaymentTransactionListComponent,
        data: {
          title: 'Transaction List',
        },
      },
     
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(collegeRoutes)],
  exports: [RouterModule],
})
export class PaymentTransactionRoutingModule { }
