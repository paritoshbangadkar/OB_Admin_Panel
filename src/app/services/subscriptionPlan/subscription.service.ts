import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  routes: any = {
    createPath: `/admin/subscription-plan`,
    getAllPath: `/admin/subscription-plan`,
    getAllSubscription: `/admin/subscription-pricing/`,
    getAllTransactionPath: `/admin/subscription-plan/transaction`,
    updatePath: (id) => `/admin/subscription-plan/${id}`,
    changeStatus: (_id) => `/admin/subscription-plan/${_id}`,
    getByIdPath: (id) => `/admin/subscription-plan/${id}`,
    deletePath: (id) => `/admin/subscription-plan/${id}`,
    createPlan: `/admin/subscription-pricing/`,
    currentSubscription: `/admin/subscription-plan/current-subscription`,
    shopSubscription: `/admin/subscription-plan/subscription`,
    recurringSubscription: `/admin/subscription-plan/recurring-subscription`,
    createFreePlan: `/admin/subscription-pricing/create-free-plan`,
  };
  constructor(private http: ApiService) {}

  create(payload) {
    return this.http
      .post(this.routes.createPath, payload)
      .pipe(map((res: any) => res));
  }
  createPlan(payload) {
    return this.http
      .post(this.routes.createPlan, payload)
      .pipe(map((res: any) => res));
  }
  getAllSubscription(params) {
    return this.http
      .get(this.routes.getAllSubscription, params)
      .pipe(map((res: any) => res));
  }
  getAll(params) {
    return this.http
      .get(this.routes.getAllPath, params)
      .pipe(map((res: any) => res));
  }
  getAllTransaction(params) {
    return this.http
      .get(this.routes.getAllTransactionPath, params)
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

  currentSubscription(params) {
    return this.http
      .get(this.routes.currentSubscription, params)
      .pipe(map((res: any) => res));
  }

  subscriptionList(params) {
    return this.http
      .get(this.routes.shopSubscription, params)
      .pipe(map((res: any) => res));
  }

  recurringSubscriptionList(params) {
    return this.http
      .get(this.routes.recurringSubscription, params)
      .pipe(map((res: any) => res));
  }
  createFreePlan(payload) {
    return this.http
      .post(this.routes.createFreePlan, payload)
      .pipe(map((res: any) => res));
  }
}
