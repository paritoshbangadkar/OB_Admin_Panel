import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubCategoryFormComponent } from './sub-category-form/sub-category-form.component';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';

const collegeRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Sub Category',
    },
    children: [
      {
        path: '',
        redirectTo: 'subCategory-list',
      },
      {
        path: 'subCategory-list',
        component: SubCategoryListComponent,
        data: {
          title: 'Sub Category List',
        },
      },
      {
        path: 'subCategory-form',
        component: SubCategoryFormComponent,
        data: {
          title: 'Sub Category Form',
        },
      },
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(collegeRoutes)],
  exports: [RouterModule],
})
export class SubCategoryRoutingModule {}
