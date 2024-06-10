import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateVersionComponent } from './update-version/update-version.component';

const collegeRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Application Update',
    },
    children: [
      {
        path: '',
        redirectTo: 'update-version',
      },
      {
        path: 'update-version',
        component: UpdateVersionComponent,
        data: {
          title: 'Update Version',
        },
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(collegeRoutes)],
  exports: [RouterModule],
})
export class ApplicationUpdateRoutingModule { }
