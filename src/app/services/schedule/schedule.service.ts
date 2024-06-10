import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/httpApi.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  routes: any = {
    createPath: `/admin/schedule`,
    getAllPath: `/admin/schedule/`,
    getByIdPath: (id) => `/admin/schedule/${id}`,
    updatePath: (id) => `/admin/schedule/${id}`,
    changeStatus: (_id) => `/admin/schedule/${_id}`,
    deletePath: (id) => `/admin/schedule/${id}`,
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
      .put(this.routes.updatePath(payload._id), payload)
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