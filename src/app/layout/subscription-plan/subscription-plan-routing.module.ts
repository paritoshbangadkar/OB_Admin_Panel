import { NgModule } from '@angular/core';
import { SubscriptionPlanListComponent } from './subscription-plan-list/subscription-plan-list.component';
import { SubscriptionPlanFormComponent } from './subscription-plan-form/subscription-plan-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionContentComponent } from './subscription-content/subscription-content.component';
import { SubscriptionPricingComponent } from './subscription-pricing/subscription-pricing.component';
import { SubscriptionDiscountComponent } from './subscription-discount/subscription-discount.component';
import { SubscriptionDiscountFormComponent } from './subscription-discount-form/subscription-discount-form.component';
import { FreePlanListComponent } from './free-plan-list/free-plan-list.component';
import { FreePlanFormComponent } from './free-plan-form/free-plan-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'plan', pathMatch: 'full' },
  {
    path: '', component: SubscriptionContentComponent,
    children: [
      { path: 'plan', component: SubscriptionPricingComponent },
      { path: 'free-plan', component: FreePlanListComponent },
      { path: 'advertisement-plan', component: SubscriptionPlanListComponent },
      { path: 'plan-discount', component: SubscriptionDiscountComponent },
    ]
  },
  {
    path: 'view', component: SubscriptionPlanFormComponent
  },
  {
    path: 'new', component: SubscriptionPlanFormComponent
  },
  {
    path: 'add', component: SubscriptionDiscountFormComponent
  },
  {
    path: 'add-free-plan', component: FreePlanFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionPlanRoutingModule { }
