import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {

  routes: any = {
    createPath: `/admin/discount`,
    getAllPath: `/admin/discount`,
    updatePath: (id) => `/admin/discount/${id}`,
    getByIdPath: (id) => `/admin/discount/${id}`,
    changeStatus: (_id) => `/admin/discount/${_id}`,
    deletePath: (id) => `/admin/discount/${id}`,
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