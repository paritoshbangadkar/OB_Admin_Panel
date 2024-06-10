import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportListComponent } from './support-list/support-list.component';

const supportRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Support',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: SupportListComponent,
        data: {
          title: 'Support List',
        },
      },


    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(supportRoutes)],
  exports: [RouterModule],
})
export class SupportRoutingModule { }
