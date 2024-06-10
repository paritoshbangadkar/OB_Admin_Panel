import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportListComponent } from './report-list/report-list.component';


const reportRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Report',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: ReportListComponent,
        data: {
          title: 'Report List',
        },
      },


    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(reportRoutes)],
  exports: [RouterModule],
})
export class ReportRoutingModule { }
