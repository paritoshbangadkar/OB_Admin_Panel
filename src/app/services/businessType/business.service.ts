import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  routes: any = {
    createPath: `/admin/business-type/`,
    getAllPath: `/admin/business-type`,
    getAllBusinessWithCategoryAndSubCategoryPath: `/admin/business-type/getAllBusinessWithCategoryAndSubCategory`,
    getAllBusinessWithCategory: `/admin/business-type/getAllBusinessWithCategory`,
    changeStatus: (_id) => `/admin/business-type/${_id}`,
    updatePath: (id) => `/admin/business-type/${id}`,
    getByIdPath: (id) => `/admin/business-type/${id}`,
    deletePath: (id) => `/admin/business-type/${id}`,
  };
  constructor(private http: ApiService) { }

  create(payload) {
    return this.http
      .post(this.routes.createPath, payload)
      .pipe(map((res: any) => res));
  }
  getAll(params) {
    return this.http
      .get(this.routes.getAllPath, params)
      .pipe(map((res: any) => res));
  }
  getAllBusinessWithCategoryAndSubCategory() {
    return this.http
      .get(this.routes.getAllBusinessWithCategoryAndSubCategoryPath)
      .pipe(map((res: any) => res));
  }

  getAllBusinessWithCategory() {
    return this.http
      .get(this.routes.getAllBusinessWithCategory)
      .pipe(map((res: any) => res));
  }
  update(payload) {
    return this.http
      .put(this.routes.updatePath(payload.id), payload)
      .pipe(map((res: any) => res));
  }
  getById(id) {
    return this.http
      .get(this.routes.getByIdPath(id))
      .pipe(map((res: any) => res));
  }
  changeStatus(_id) {
    return this.http
      .patch(this.routes.changeStatus(_id))
      .pipe(map((res: any) => res));
  }
  delete(id) {
    return this.http
      .delete(this.routes.deletePath(id))
      .pipe(map((res: any) => res));
  }
}
