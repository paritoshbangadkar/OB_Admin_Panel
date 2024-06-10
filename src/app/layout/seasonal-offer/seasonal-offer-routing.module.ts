import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeasonalOfferListComponent } from './seasonal-offer-list/seasonal-offer-list.component';
import { SeasonalOfferFormComponent } from './seasonal-offer-form/seasonal-offer-form.component';


const categoryRoutes: Routes = [
  {
    path: '',
    data: {
      // title: 'Seasonal Offer',
      title: 'Deals',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component:  SeasonalOfferListComponent,
        data: {
          // title: 'Seasonal Offer List',
          title: 'Deals List',
        },
      },
      {
        path: 'details',
        component: SeasonalOfferFormComponent,
        data: {
          // title: 'seasonalOffer Form',
          title: 'Deals Form',
        },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(categoryRoutes)],
  exports: [RouterModule],
})
export class SeasonalOfferRoutingModule {}
