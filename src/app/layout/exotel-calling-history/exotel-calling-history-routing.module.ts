import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExotelCallingHistorylistComponent } from './exotel-calling-historylist/exotel-calling-historylist.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Call History',
    },
    children: [
      {
        path: '',
        redirectTo: 'call-list',
      },
      {
        path: 'call-list',
        component: ExotelCallingHistorylistComponent,
        data: {
          title: 'Call List',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExotelCallingHistoryRoutingModule { }
