import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  routes: any = {
    createPath: `/admin/category`,
    getAllTable: `/admin/category`,
    getAllPath: `/shared/category/`,
    changeStatus: (_id) => `/admin/category/${_id}`,
    updatePath: (id) => `/admin/category/${id}`,
    getByIdPath: (id) => `/admin/category/${id}`,
    deletePath: (id) => `/admin/category/${id}`,

  };
  constructor(private http: ApiService) { }

  create(payload) {
    return this.http
      .post(this.routes.createPath, payload)
      .pipe(map((res: any) => res));
  }

  getAllTable(params) {
    return this.http
      .get(this.routes.getAllTable, params)
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
