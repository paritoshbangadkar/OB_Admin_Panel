import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class CoinManagementService {
  routes: any = {
    createPath: `/admin/coin`,
    getAllPath: `/admin/coin`,
    changeStatus: (_id) => `/admin/coin/${_id}`,
    updatePath: (id) => `/admin/coin/${id}`,
    getByIdPath: (id) => `/admin/coin/${id}`,
    deletePath: (id) => `/admin/coin/${id}`,
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
