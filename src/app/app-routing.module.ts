import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './core/guards';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'profile',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./views/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'users',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./layout/users/users.module').then(
            (m) => m.UsersModule
          ),
      },
      {
        path: 'notification',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./layout/notification/notification.module').then(
            (m) => m.NotificationModule
          ),
      },
      {
        path: 'businessType',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./layout/businessType/business-type.module').then(
            (m) => m.BusinessTypeModule
          ),
      },
      {
        path: 'category',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./layout/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: 'subCategory',
        canLoad: [AuthGuard],
        loadChildren: () => import('./layout/sub-category/sub-category.module').then
          (m => m.SubCategoryModule
          )
      },
      {
        path: 'shop',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./layout/shop/shop.module').then(
            (m) => m.ShopModule
          ),
      },
      {
        path: 'customer',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./layout/customer/customer.module').then(
            (m) => m.CustomerModule
          ),
      },
      {
        path: 'advertise',
        canLoad: [AuthGuard],
        loadChildren: () => import('./layout/advertise/advertise.module').then
          (m => m.AdvertiseModule
          )
      },
      {
        path: 'offer',
        canLoad: [AuthGuard],
        loadChildren: () => import('./layout/offer/offer.module').then
          (m => m.OfferModule
          )
      },
      {
        path: 'seasonal-offer',
        canLoad: [AuthGuard],
        loadChildren: () => import('./layout/seasonal-offer/seasonal-offer.module').then
          (m => m.SeasonalOfferModule
          )
      },
      {
        path: 'report',
        canLoad: [AuthGuard],
        loadChildren: () => import('./layout/report/report.module').then
          (m => m.ReportModule
          )
      },
      {
        path: 'support',
        canLoad: [AuthGuard],
        loadChildren: () => import('./layout/support/support.module').then
          (m => m.SupportModule
          )
      },
      {
        path: 'onboard-shop',
        canLoad: [AuthGuard],
        loadChildren: () => import('./layout/onboard-shop/onboard-shop.module').then
          (m => m.OnboardShopModule
          )
      },
      {
        path: 'user-analytics',
        canLoad: [AuthGuard],
        loadChildren: () => import('./layout/user-analytics/user-analytics.module').then
          (m => m.UserAnalyticsModule
          )
      },
      {
        path: 'plan',
        canLoad: [AuthGuard],
        loadChildren: () => import('./layout/subscription-plan/subscription-plan.module').then
          (m => m.SubscriptionPlanModule
          )
      },
      {
        path: 'transaction',
        canLoad: [AuthGuard],
        loadChildren: () => import('./layout/payment-transaction/payment-transaction.module').then
          (m => m.PaymentTransactionModule
          )
      },
      {
        path: 'porter',
        canLoad: [AuthGuard],
        loadChildren: () => import('./layout/porter/porter.module').then
          (m => m.PorterModule
          )
      },
      {
        path: 'deleted-business',
        canLoad: [AuthGuard],
        loadChildren: () => import('./layout/deleted-business/deleted-business.module').then
          (m => m.DeletedBusinessModule
          )
      },
      {
        path: 'in-app-ad-modal',
        canLoad: [AuthGuard],
        loadChildren: () => import('./layout/in-app-ad-modal/in-app-ad-modal.module').then
          (m => m.InAppAdModalModule
          )
      },
      {
        path: 'coin-management',
        canLoad: [AuthGuard],
        loadChildren: () => import('./layout/coin-management/coin-management.module').then
          (m => m.CoinManagementModule
          )
      },
      {
        path: 'order',
        canLoad: [AuthGuard],
        loadChildren: () => import('./layout/orders/orders.module').then
          (m => m.OrdersModule
          )
      },
      {
        path: 'in-app-update',
        canLoad: [AuthGuard],
        loadChildren: () => import('./layout/applicaion-update/applicaion-update.module').then
          (m => m.ApplicaionUpdateModule
          )
      },
      {
        path: 'exotel-call',
        canLoad: [AuthGuard],
        loadChildren: () => import('./layout/exotel-calling-history/exotel-calling-history.module').then
          (m => m.ExotelCallingHistoryModule
          )
      },
      {
        path: 'event',
        canLoad: [AuthGuard],
        loadChildren: () => import('./layout/event/event.module').then
          (m => m.EventModule
          )
      },

    ],
  },

  { path: '**', component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
