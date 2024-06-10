import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class FreePlanService {
  routes: any = {
    createPath: `/admin/subscription-pricing/create`,
    getAllPath: `/admin/subscription-pricing/get`,
    getAllActiveFreePlan: `/admin/subscription-pricing/get-plan`,
    updatePath: (id) => `/admin/subscription-pricing/${id}`,
    getByIdPath: (id) => `/admin/subscription-pricing/${id}`,
    changeStatus: (id) => `/admin/subscription-pricing/${id}`,
    deletePath: (id) => `/admin/subscription-pricing/${id}`,
  };
  constructor(private http: ApiService) {}

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

  getAllActiveFreePlan(params) {
    return this.http
      .get(this.routes.getAllActiveFreePlan, params)
      .pipe(map((res: any) => res));
  }
}
