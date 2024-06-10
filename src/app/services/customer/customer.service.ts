import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  routes: any = {
    createPath: `/admin/customer/`,
    getAllPath: `/admin/customer`,
    updatePath: (id) => `/admin/customer/${id}`,
    changeStatus:(_id) => `/admin/customer/${_id}`,
    getByIdPath: (id) => `/admin/customer/${id}`,
    deletePath: (id) => `/admin/customer/${id}`,
    getAddress: (id) => `/admin/customer/address/${id}`,
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
  changeStatus(id) {
    return this.http
      .patch(this.routes.changeStatus(id))
      .pipe(map((res: any) => res));
  }
  delete(id) {
    return this.http
      .delete(this.routes.deletePath(id))
      .pipe(map((res: any) => res));
  }

  // get address bu user id
  getAddress(id) {
    return this.http
      .get(this.routes.getAddress(id))
      .pipe(map((res: any) => res));
  }
}
