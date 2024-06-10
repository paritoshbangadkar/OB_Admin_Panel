import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    routes: any = {
        getAllOrders: `/admin/order/`,
    };
    constructor(private http: ApiService) { }

    getAllOrders(params) {
        return this.http
            .get(this.routes.getAllOrders, params)
            .pipe(map((res: any) => res));
    }
}
