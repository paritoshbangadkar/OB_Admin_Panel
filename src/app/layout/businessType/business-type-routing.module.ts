import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessTypeFormComponent } from './business-type-form/business-type-form.component';
import { BusinessTypeListComponent } from './business-type-list/business-type-list.component';

const collegeRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Business Type',
    },
    children: [
      {
        path: '',
        redirectTo: 'business-list',
      },
      {
        path: 'business-list',
        component: BusinessTypeListComponent,
        data: {
          title: 'Business List',
        },
      },
      {
        path: 'business-form',
        component: BusinessTypeFormComponent,
        data: {
          title: 'Business Form',
        },
      },
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(collegeRoutes)],
  exports: [RouterModule],
})
export class BusinessTypeRoutingModule {}
