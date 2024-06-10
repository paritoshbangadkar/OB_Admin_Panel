import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class PorterService {
  routes: any = {

    getAllOrders: `/admin/porter-order/`,
    getAllPath: `/admin/shop/porter-deactivation-request`,
    getPorterService: `/admin/shop/porter-service`,

  };
  constructor(private http: ApiService) { }
  getAll(params) {
    return this.http
      .get(this.routes.getAllPath, params)
      .pipe(map((res: any) => res));
  }
  getAllOrders(params) {
    return this.http
      .get(this.routes.getAllOrders, params)
      .pipe(map((res: any) => res));
  }

  porterService(params) {
    return this.http
      .get(this.routes.getPorterService, params)
      .pipe(map((res: any) => res));
  }
}
