import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';

@Injectable({
    providedIn: 'root',
})
export class ReportService {
    routes: any = {
        getAllPath: `/admin/report/`,
        getAllChatMessage: (id) => `/admin/report/order-chat/${id}`
    };
    constructor(private http: ApiService) { }
    getAll(params) {
        return this.http
            .get(this.routes.getAllPath, params)
            .pipe(map((res: any) => res));
    }

    getAllChatMessage(id,payload) {
        return this.http
            .get(this.routes.getAllChatMessage(id),payload)
            .pipe(map((res: any) => res));
    }

}
