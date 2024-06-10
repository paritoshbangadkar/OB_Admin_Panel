import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InAppAdModalFormComponent } from './in-app-ad-modal-form/in-app-ad-modal-form.component';
import { InAppAdModalListComponent } from './in-app-ad-modal-list/in-app-ad-modal-list.component';

const userRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Popup',
    },
    children: [
      {
        path: '',
        redirectTo: 'in-app-ad-modal-list',
      },
      {
        path: 'in-app-ad-modal-list',
        component: InAppAdModalListComponent,
        data: {
          title: 'Popup-list',
        },
      },
      {
        path: 'in-app-ad-modal-form',
        component: InAppAdModalFormComponent,
        data: {
          title: 'Popup-Form',
        },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class InAppAdModalRoutingModule { }
