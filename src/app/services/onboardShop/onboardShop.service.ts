import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class OnboardShopService {
  routes: any = {

    getAllPath: `/admin/shop/onboard-shop`,
    createPath: `/admin/shop/create-onboard-shop`,
    changeStatus: (_id) => `/admin/onboard-shop/${_id}`,
    getByIdPath: (id) => `/admin/shop/onboard-shop/${id}`,
    updatePath: (id) => `/admin/shop/onboard-shop/${id}`,
    deletePath: (id) => `/admin/shop/onboard-shop/${id}`,
    insertShopData: `/admin/shop/create-bulk`,
    getAllInvalidRowShops: `/admin/raw-shop/`,
    getRawShopById: (id) => `/admin/raw-shop/${id}`,
    deleteRawShop: (id) => `/admin/raw-shop/delete/${id}`,
    deleteManyRawShop:`/admin/raw-shop/delete-many`
  };
  constructor(private http: ApiService) { }
  getAll(params) {
    return this.http
      .get(this.routes.getAllPath, params)
      .pipe(map((res: any) => res));
  }
  create(payload) {
    return this.http
      .post(this.routes.createPath, payload)
      .pipe(map((res: any) => res));
  }
  getById(id) {
    return this.http
      .get(this.routes.getByIdPath(id))
      .pipe(map((res: any) => res));
  }
  update(payload) {
    return this.http
      .put(this.routes.updatePath(payload._id), payload)
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

  insertShopData(payload) {
    return this.http
      .post(this.routes.insertShopData, payload)
      .pipe(map((res: any) => res));
  }

  getAllInvalidRowShops(params) {
    return this.http
      .get(this.routes.getAllInvalidRowShops, params)
      .pipe(map((res: any) => res));
  }

  getRawShopById(id) {
    return this.http
      .get(this.routes.getRawShopById(id))
      .pipe(map((res: any) => res));
  }

  deleteRawShop(id) {
    return this.http
      .delete(this.routes.deleteRawShop(id))
      .pipe(map((res: any) => res));
  }
  
  deleteManyRawShop(payload:any) {
    return this.http
      .deleteObj(this.routes.deleteManyRawShop,payload)
      .pipe(map((res: any) => res));
  }
}
