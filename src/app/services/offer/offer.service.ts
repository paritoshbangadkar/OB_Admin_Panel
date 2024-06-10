import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  routes: any = {
    createPath: `/admin/offer`,
    getAllPath: `/admin/offer`,
    changeStatus: (_id) => `/admin/offer/${_id}`,
    updatePath: (id) => `/admin/offer/${id}`,
    getByIdPath: (id) => `/admin/offer/${id}`,
    deletePath: (id) => `/admin/offer/${id}`,
    getShops: `/shared/shop`,
    getAllCategory: `/shared/category/`,
    getAllCategoryOffer: `/admin/offer/category-offer`

  };
  constructor(private http: ApiService) { }

  create(payload) {
    return this.http
      .post(this.routes.createPath, payload)
      .pipe(map((res: any) => res));
  }
  getAllShops(params) {
    return this.http
      .get(this.routes.getShops, params)
      .pipe(map((res: any) => res));
  }
  getAllCategory(params) {
    return this.http
      .get(this.routes.getAllCategory, params)
      .pipe(map((res: any) => res));
  }
  getAll(params) {
    return this.http
      .get(this.routes.getAllPath, params)
      .pipe(map((res: any) => res));
  }
  getAllCategoryOffer(params) {
    return this.http
      .get(this.routes.getAllCategoryOffer, params)
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
