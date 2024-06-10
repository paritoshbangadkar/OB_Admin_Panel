import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class AdvertiseService {
  routes: any = {
    createPath: `/admin/advertise`,
    getAllPath: `/admin/advertise`,
    changeStatus: (_id) => `/admin/advertise/${_id}`,
    updatePath: (id) => `/admin/advertise/${id}`,
    getByIdPath: (id) => `/admin/advertise/${id}`,
    deletePath: (id) => `/admin/advertise/${id}`,
    getAllCategory: `/shared/category/`,
    getAllCategoryAd:`/admin/advertise/category-advertise`
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
  getAllCategoryAd(params) {
    return this.http
      .get(this.routes.getAllCategoryAd, params)
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
  getAllCategory(params) {
    return this.http
      .get(this.routes.getAllCategory, params)
      .pipe(map((res: any) => res));
  }
}
