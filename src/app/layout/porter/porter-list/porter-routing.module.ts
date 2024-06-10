import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PorterListComponent } from './porter-list.component';
import { PorterFormComponent } from '../porter-form/porter-form.component';

const porterRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Porter',
    },
    children: [
      {
        path: '',
        redirectTo: 'porter-list',
      },
      {
        path: 'porter-list',
        component: PorterListComponent,
        data: {
          title: 'Porter List',
        }
      },
      {
        path: 'porter-form',
        component: PorterFormComponent,
        data: {
          title: 'Porter Form',
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(porterRoutes)],
  exports: [RouterModule],
})
export class PorterRoutingModule { }
