import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})

export class UserAnalyticsService {
  routes: any = {
    getAll: `/admin/user-analytics/`,
  };
  constructor(private http: ApiService) { }

  getAll(params) {
    return this.http
      .get(this.routes.getAll, params)
      .pipe(map((res: any) => res));
  }

}
