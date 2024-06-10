import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryOfferListComponent } from './category-offer-list/category-offer-list.component';
import { CategoryAdvertiseListComponent } from './category-advertise-list/category-advertise-list.component';
import { CategoryDealsListComponent } from './category-deals-list/category-deals-list.component';

const categoryRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Category',
    },
    children: [
      {
        path: '',
        redirectTo: 'category-list',
      },
      {
        path: 'category-list',
        component: CategoryListComponent,
        data: {
          title: 'Category List',
        },
      },
      {
        path: 'category-form',
        component: CategoryFormComponent,
        data: {
          title: 'Category Form',
        },
      },
      {
        path: 'offers',
        component: CategoryOfferListComponent,
        data: {
          title: 'Category Offers',
        },
      },
      {
        path: 'deals',
        component: CategoryDealsListComponent,
        data: {
          title: 'Category Deals',
        },
      },
      {
        path: 'advertise',
        component: CategoryAdvertiseListComponent,
        data: {
          title: 'Category Advertise',
        },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(categoryRoutes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule { }
