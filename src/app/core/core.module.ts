import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DragDropDirective } from './../directives';
import {
  AlertComponent,
  AlertService,
  CustomPaginationComponent,
} from './components/index';

import { AuthGuard } from './guards/index';
import { HttpTokenInterceptor } from './interceptors';

import {
  ErrorInterceptorProvider,
  ApiPrefixInterceptorProvider,
} from './helpers/index';

import { ApiService, StorageService, UserService } from './services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JwtService } from './services/jwt.service';
import { CacheInterceptor } from './interceptors/cache.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AlertComponent,
    CustomPaginationComponent,
    DragDropDirective,
  ],
  exports: [
    AlertComponent,
    CustomPaginationComponent,
    DragDropDirective,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    CommonModule,
    NgbModule,
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CacheInterceptor,
          multi: true
        },
        AuthGuard,
        UserService,
        AlertService,
        ToastrService,
        ApiService,
        StorageService,
        JwtService,
        ErrorInterceptorProvider,
        ApiPrefixInterceptorProvider,
      ],
    };
  }
}
