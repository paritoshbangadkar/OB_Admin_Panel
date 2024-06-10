import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  routes: any = {
    createPath: `/admin/catalogue`,
    getAllPath: `/admin/catalogue`,
    changeStatus: (_id) => `/admin/catalogue/${_id}`,
    updatePath: (id) => `/admin/catalogue/${id}`,
    getByIdPath: (id) => `/admin/catalogue/${id}`,
    deletePath: (id) => `/admin/catalogue/${id}`,
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
  getAllProductByShopId(obj) {
    return this.http
      .get(this.routes.getAllProductByShopId, obj)
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
  getAllSubCategoryByShopId(params) {
    return this.http
      .get(this.routes.getAllSubCategoryByShopIdPath, params)
      .pipe(map((res: any) => res));
  }

  getSubCategoryByShopId(id) {
    return this.http
      .get(this.routes.getSubCategoryByShopIdPath(id))
      .pipe(map((res: any) => res));
  }
}
