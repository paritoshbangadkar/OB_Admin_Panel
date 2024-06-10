import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OPTIONS } from '../../core/helpers/constants.helper';
import { formatErrors } from '../../core/helpers/utils.helper';
import { JwtService } from 'src/app/core/services/jwt.service';

@Injectable()
export class UploadService {
  token: String;
  private httpClient: HttpClient;

  constructor(private jwtService: JwtService, handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
    this.token = this.jwtService.getToken();
  }

  uploadFile(
    formData,
    isNew: boolean = false,
    id: string = ''
  ): Observable<any> {
    const httpHeaders = {
      headers: new HttpHeaders({
        Authorization: `JWT ${this.token}`,
        Accept: 'application/json',
        enctype: 'multipart/form-data',
      }),
    };
    let path = `/shared/upload`;
    return this.httpClient
      .post(`${environment.apiEndpoint}${path}`, formData, httpHeaders)
      .pipe(catchError(formatErrors))
      .pipe(
        map((data) => {
          if (data) {
            return data;
          } else {
            return null;
          }
        })
      );
  }

  uploadBulkFile(
    formData,
    isNew: boolean = false,
    id: string = ''
  ): Observable<any> {
    const httpHeaders = {
      headers: new HttpHeaders({
        Authorization: `JWT ${this.token}`,
        Accept:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        enctype: 'multipart/form-data',
      }),
    };
    let path = `upload`;
    return this.httpClient
      .post(`${environment.apiEndpoint}${path}`, formData, httpHeaders)
      .pipe(catchError(formatErrors))
      .pipe(
        map((data) => {
          if (data) {
            return data;
          } else {
            return null;
          }
        })
      );
  }

  generateCategorySubCategoryExcel() {
    let headers = new HttpHeaders({
      Authorization: `JWT ${this.token}`,
      Accept: 'application/json',
    });
    let url: string = `/admin/shop/category-sub-category-excel`;
    return this.httpClient.get(`${environment.apiEndpoint}${url}`, {
      headers,
      responseType: 'blob',
    });
  }

  generateBusinessTypeExcel() {
    let headers = new HttpHeaders({
      Authorization: `JWT ${this.token}`,
      Accept: "application/json",
    });
    let url: string = `/admin/shop/business-type-excel`;
    return this.httpClient.get(`${environment.apiEndpoint}${url}`, {
      headers,
      responseType: 'blob',
    });
  }

  generateExport(params) {
    let headers = new HttpHeaders({
      Authorization: `JWT ${this.token}`,
      Accept: "application/json",
    });
    let url: string = `/admin/user/export`;
    return this.httpClient.get(`${environment.apiEndpoint}${url}`, {
      headers,
      params,
      responseType: 'blob',
    });
  }

  /**
   * delete the uploaded file from db
   * @param payload
   * @returns
   */
  deleteUploadedImage(payload: any): Observable<any> {
    let path = `/shared/remove`;
    return this.httpClient
      .put(`${environment.apiEndpoint}${path}`, payload)
      .pipe(catchError(formatErrors))
      .pipe(
        map((data) => {
          if (data) {
            return data;
          } else {
            return null;
          }
        })
      );
  }

  /**
   * check the file size
   * @param file
   * @returns
   */
  checkFileSize(file) {
    let size = file.size / (1024 * 1024);
    if (size < OPTIONS.maxLimit) {
      return true;
    }
    return false;
  }

  // for notification
  checkFileSizeForNotification(file) {
    let size = file.size / (1024 * 1024);
    if (size < OPTIONS.maxLimitForNotification) {
      return true;
    }
    return false;
  }

  /**
   * check upload file type
   * @param file
   * @returns
   */
  checkDocumentType(file) {
    let types = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    if (types.includes(file.type)) {
      return true;
    }
    return false;
  }

  /**
   * check upload file type
   * @param file
   * @returns
   */
  checkImageType(file) {
    let types = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'video/mp4',
    ];
    if (types.includes(file.type)) {
      return true;
    }
    return false;
  }

  // for notification
  checkImageTypeForNotification(file) {
    let types = [
      'image/jpg',
    ];
    if (types.includes(file.type)) {
      return true;
    }
    return false;
  }

  /**
   * check upload file type
   * @param file
   * @returns
   */
  checkFileType(file) {
    let types = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      '.csv',
    ];
    if (types.includes(file.type)) {
      return true;
    }
    return false;
  }

  /**
   * upload shop in bulk
   * @param id
   * @returns
   */
  uploadShopInBulk(formData: any): Observable<any> {
    const httpHeaders = {
      headers: new HttpHeaders({
        Authorization: `JWT ${this.token}`,
        Accept: 'application/json',
        enctype: 'multipart/form-data',
      }),
    };
    let path = `/admin/shop/bulk-upload`;
    return this.httpClient
      .post(`${environment.apiEndpoint}${path}`, formData, httpHeaders)
      .pipe(catchError(formatErrors))
      .pipe(
        map((data: any) => {
          if (data && data.result) {
            return data.result;
          } else {
            return null;
          }
        })
      );
  }
}
