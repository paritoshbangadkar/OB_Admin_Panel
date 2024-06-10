import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoinListComponent } from './coin-list/coin-list.component';
import { CoinFormComponent } from './coin-form/coin-form.component';

const collegeRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Coin-Management',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: CoinListComponent,
        data: {
          title: 'List',
        },
      },
      {
        path: 'form',
        component: CoinFormComponent,
        data: {
          title: 'Form',
        },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(collegeRoutes)],
  exports: [RouterModule],
})
export class CoinManagementRoutingModule { }
