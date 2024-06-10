import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs';
import { User } from '../models/user.interface';
import { JwtService } from './jwt.service';
import { ApiService } from './httpApi.service';

@Injectable()
export class UserService {
  public currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());


  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(private apiService: ApiService, private jwtService: JwtService,
  ) { }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      const url = '/admin/user';
      this.apiService.get(url, undefined).subscribe(
        (data: any) => {
          if (data) {
            this.setAuth(data);
          } else {
            this.purgeAuth();
          }
        },
        (err) => this.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  login(payload: any): Observable<any> {
    const url = '/admin/user/login';
    return this.apiService.post(url, payload).pipe(
      map((data: any) => {
        if (data) {
          this.setAuth(data);
          return data;
        } else {
          return null;
        }
      })
    );
  }

  getAll(params) {
    let url: string = `/admin/user/getAll`;
    return this.apiService.get(url, params).pipe(
      map((data: any) => {
        return data.data;
      }),
      catchError(this.handleErrorObservable)
    );
  }

  createUser(payload: any) {
    let url: string = `/admin/user/register`;
    return this.apiService.post(url, payload).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleErrorObservable)
    );
  }

  getById(id: string) {
    let url: string = `/admin/user/${id}`;
    return this.apiService.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleErrorObservable)
    );
  }

  updateUser(id: string, payload: any) {
    let url: string = `/admin/user/${payload._id}`;
    return this.apiService.put(url, payload).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleErrorObservable)
    );
  }

  deleteUser(id) {
    let url: string = `/admin/user/${id}`;
    return this.apiService.delete(url).pipe(
      map((data: any) => {
        if (data && data) {
          return data;
        } else {
          return null;
        }
      })
    );
  }

  getVersion() {
    let url: string = `/admin/user/current-version`;
    return this.apiService.get(url).pipe(
      map((data: any) => {
        if (data && data) {
          return data;
        } else {
          return null;
        }
      })
    );
  }

  updateVersion(payload: any) {
    let url: string = `/admin/user/update-version`;
    return this.apiService.put(url, payload).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleErrorObservable)
    );
  }

  verifyPin(payload: any) {
    let url: string = `/admin/user/verify-pin`;
    return this.apiService.patch(url, payload).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleErrorObservable)
    );
  }

  private handleErrorObservable(error: HttpErrorResponse) {
    return throwError(error);
  }
}
