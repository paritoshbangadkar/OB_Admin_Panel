import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})

export class DashboardService {
  routes: any = {

    getAllPath: `/admin/dashboard/stats`,
    getAll: `/admin/dashboard/order`,
    getTransaction: `/admin/dashboard/transaction`,

  };
  constructor(private http: ApiService) { }

  getAll(params) {
    return this.http
      .get(this.routes.getAllPath, params)
      .pipe(map((res: any) => res));
  }

  getAllOrders(params) {
    return this.http
      .get(this.routes.getAll, params)
      .pipe(map((res: any) => res));
  }

  getOrdersTransaction(params) {
    return this.http
      .get(this.routes.getTransaction, params)
      .pipe(map((res: any) => res));
  }
}
