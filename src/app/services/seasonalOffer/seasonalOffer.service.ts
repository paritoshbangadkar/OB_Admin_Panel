import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class SeasonalOfferService {
  routes: any = {
    createPath: `/admin/seasonal-offer`,
    getAllPath: `/admin/seasonal-offer`,
    changeStatus: (_id) => `/admin/seasonal-offer/${_id}`,
    updatePath: (id) => `/admin/seasonal-offer/${id}`,
    getByIdPath: (id) => `/admin/seasonal-offer/${id}`,
    deletePath: (id) => `/admin/seasonal-offer/${id}`,
    getAllCategoryDeals: `/admin/seasonal-offer/category-deals`,
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
  getAllCategoryDeals(params) {
    return this.http
      .get(this.routes.getAllCategoryDeals, params)
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
