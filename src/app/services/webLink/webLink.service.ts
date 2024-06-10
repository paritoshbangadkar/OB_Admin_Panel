import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/httpApi.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class WebLinkService {
  routes: any = {
    createPath: `/admin/web-link`,
    getAllPath:(id) => `/admin/web-link/${id}`,
    updatePath: (id) => `/admin/web-link/${id}`,
    deletePath: (id) => `/admin/web-link/${id}`,
  };

  constructor(private http: ApiService) { }

  create(payload) {
    return this.http
      .post(this.routes.createPath, payload)
      .pipe(map((res: any) => res));
  }

  getAll(id) {
   return this.http
      .get(this.routes.getAllPath(id) )
      .pipe(map((res: any) => res));
  }

  update(payload) {
    return this.http
      .put(this.routes.updatePath(payload._id), payload)
      .pipe(map((res: any) => res));
  }

  delete(id) {
    return this.http
      .delete(this.routes.deletePath(id))
      .pipe(map((res: any) => res));
  }

}