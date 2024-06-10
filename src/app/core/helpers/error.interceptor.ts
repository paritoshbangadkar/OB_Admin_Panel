import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService } from '../services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  currentRoute: string;
  userDetails: any;
  constructor(
    private storageService: StorageService,
    private toastService: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // extract error message from http body if an error occurs
    return next.handle(request).pipe(
      catchError((errorResponse) => {
        console.log("errorResponse",errorResponse.error.error);
        
        this.spinner.hide();
        if (errorResponse instanceof HttpErrorResponse) {
          if (!navigator.onLine) {
            // No Internet connection
            this.toastService.warning('No Internet Connection');
          }
          switch (errorResponse.status) {
            case 401: // login
              // redirect to login page with the return url
              this.router.events
                .pipe(filter((event) => event instanceof NavigationEnd))
                .subscribe((event) => {
                  this.currentRoute = event['url'];
                });
              this.userDetails = this.storageService.get('OBUser');
              // this.router.navigate(['/login'], {
              //   queryParams: { returnUrl: this.currentRoute },
              // });

              break;
            case 400: // forbidden
              // // show server bad request message
              if (errorResponse.error?.error?.errors) {
                for (
                  let i = errorResponse.error.error.errors.length - 1;
                  i >= 0;
                  i--
                ) {
                  this.toastService.error(errorResponse.error.error.errors[i]);
                }
              }
              if (errorResponse.error?.error?.error_params) {
                for (
                  let i = errorResponse.error.error.error_params.length - 1;
                  i >= 0;
                  i--
                ) {
                  this.toastService.error(
                    errorResponse.error.error.error_params[i].msg
                  );
                }
              }
              break;
            case 412: // Internal Server Error
            case 403: // Internal Server Error
            case 500: // Internal Server Error
              // console.log(errorResponse.error);
              // console.log(errorResponse.error.error.errors);
              // console.log(errorResponse.error.error.error_params);
              // this.toastService.error(errorResponse.error?.message);
              if (errorResponse.error?.error) {
                this.toastService.error(errorResponse.error.error);
              }
              if (errorResponse.error?.error?.error_params) {
                for (
                  let i = errorResponse.error.error.error_params.length - 1;
                  i >= 0;
                  i--
                ) {
                  this.toastService.error(
                    errorResponse.error.error.error_params[i].msg
                  );
                }
              }
              break;
          }
        }
        return throwError(errorResponse.error);
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
