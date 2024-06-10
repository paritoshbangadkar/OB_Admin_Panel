import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlSegment } from "@angular/router";
import { Observable } from "rxjs";
import { take, tap } from "rxjs/operators";
import { UserService } from "../services";

@Injectable()
export class AuthGuard implements CanLoad {
    constructor(
        private router: Router,
        private userService: UserService,
    ) { }

    canLoad(route: Route, segemets: UrlSegment[]): Observable<boolean> {
        return this.userService.isAuthenticated.pipe(
            take(1),
            tap((allowed) => {
                if (!allowed) {
                    let returnUrl = segemets[0].path;
                    this.clearTokens();
                    this.router.navigate(['/login'], { queryParams: { returnUrl } });
                    return false;
                } else {
                    const currentUser = this.userService.getCurrentUser();
                    if (currentUser) {
                        // if (route.data && route?.data['role'] && route.data['role'].length) {
                        return true;
                        // }
                        // this.clearTokens();
                        // this.router.navigate(['/login']);
                        // return false;
                    } else {
                        this.clearTokens();
                        this.router.navigate(['/login']);
                        return false;
                    }
                }
            })
        );
    }
    clearTokens() {
        this.userService.purgeAuth();
        window.localStorage.removeItem('clientId');
    }
}
