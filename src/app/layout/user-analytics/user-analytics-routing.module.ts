import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAnalyticsComponent } from './user-analytics/user-analytics.component';

const userRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'User Analytics',
    },
    children: [
      {
        path: '',
        redirectTo: 'user-analytics-list',
      },
      {
        path: 'user-analytics-list',
        component: UserAnalyticsComponent,
        data: {
          title: 'User-Analytics List',
        },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UserAnalyticsRoutingModule {}
