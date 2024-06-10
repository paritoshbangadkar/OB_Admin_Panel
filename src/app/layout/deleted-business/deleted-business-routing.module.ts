import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeletedBusinessListComponent } from './deleted-business-list/deleted-business-list.component';
const deletedBusinessRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'business',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: DeletedBusinessListComponent,
        data: {
          title: 'List',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(deletedBusinessRoutes)],
  exports: [RouterModule],
})
export class DeletedBusinessRoutingModule { }
