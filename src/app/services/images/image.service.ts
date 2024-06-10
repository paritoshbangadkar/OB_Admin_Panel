import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ApiService } from 'src/app/core/services';
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  routes: any = {
    createPath: `images/create`,
    getAllPath: ({ page, pageSize, search, flag }) =>
      `images/getAll?page=${page}&pagesize=${pageSize}&search=${search}&flag=${flag}`,
    updatePath: (id) => `images/update/${id}`,
    getByIdPath: (id) => `images/getById/${id}`,
    deletePath: (id) => `images/delete/${id}`,
  };
  constructor(private http: ApiService) {}

  createImage(payload) {
    return this.http
      .post(this.routes.createPath, payload)
      .pipe(map((res: any) => res));
  }

  getImageListing({ page, pageSize, search, flag }) {
    return this.http
      .get(this.routes.getAllPath({ page, pageSize, search, flag }))
      .pipe(map((res: any) => res));
  }

  updateImage(id, payload) {
    return this.http
      .put(this.routes.updatePath(id), payload)
      .pipe(map((res: any) => res));
  }

  getImageById(id) {
    return this.http
      .get(this.routes.getByIdPath(id))
      .pipe(map((res: any) => res));
  }
  deleteImage(id) {
    return this.http
      .delete(this.routes.deletePath(id))
      .pipe(map((res: any) => res));
  }

}
