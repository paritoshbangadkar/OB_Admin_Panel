import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferFormComponent } from './offer-form/offer-form.component';
import { OfferListComponent } from './offer-list/offer-list.component';

const collegeRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Offer',
    },
    children: [
      {
        path: '',
        redirectTo: 'offer-list',
      },
      {
        path: 'offer-list',
        component: OfferListComponent,
        data: {
          title: 'Offer List',
        },
      },
      {
        path: 'offer-form',
        component: OfferFormComponent,
        data: {
          title: 'Offer Form',
        },
      },
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(collegeRoutes)],
  exports: [RouterModule],
})
export class OfferRoutingModule {}
