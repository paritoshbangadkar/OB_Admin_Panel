import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationFormComponent } from './notification-form/notification-form.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
const userRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Notifications',
    },
    children: [
      {
        path: '',
        redirectTo: 'notification-list',
      },
      {
        path: 'notification-list',
        component: NotificationListComponent,
        data: {
          title: 'Notification List',
        },
      },
      {
        path: 'notification-form',
        component: NotificationFormComponent,
        data: {
          title: 'Notification Form',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class NotificationRoutingModule {}
