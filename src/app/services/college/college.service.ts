import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class CollegeService {
  routes: any = {
    createPath: `college/create`,
    getAllPath: `college/getAll`,
    updatePath: (id) => `college/update/${id}`,
    getByIdPath: (id) => `college/getById/${id}`,
    deletePath: (id) => `college/delete/${id}`,
  };
  constructor(private http: ApiService) {}

  createCollege(payload) {
    return this.http
      .post(this.routes.createPath, payload)
      .pipe(map((res: any) => res));
  }
  getAllCollege(params) {
    return this.http
      .get(this.routes.getAllPath, params)
      .pipe(map((res: any) => res));
  }
  updateCollege(id, payload) {
    return this.http
      .put(this.routes.updatePath(id), payload)
      .pipe(map((res: any) => res));
  }
  getByCollegeId(id) {
    return this.http
      .get(this.routes.getByIdPath(id))
      .pipe(map((res: any) => res));
  }
  deleteCollege(id) {
    return this.http
      .delete(this.routes.deletePath(id))
      .pipe(map((res: any) => res));
  }
}
