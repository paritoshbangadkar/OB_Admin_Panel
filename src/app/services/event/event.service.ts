import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';

@Injectable({
    providedIn: 'root',
})
export class EventService {

    routes: any = {
        getAll: `/admin/event/`,
        changeStatus: (_id) => `/admin/event/${_id}`,
        getByIdPath: `/admin/event-amount-settlement/`,
    };

    constructor(private http: ApiService) { }

    getAll(params) {
        return this.http
            .get(this.routes.getAll, params)
            .pipe(map((res: any) => res));
    }

    changeStatus(_id) {
        return this.http
            .patch(this.routes.changeStatus(_id))
            .pipe(map((res: any) => res));
    }

    //
    /**
* event and shop wise account detail
* @returns
*/
    getById(params) {
        return this.http
            .get(this.routes.getByIdPath, params)
            .pipe(map((res: any) => res));
    }
}
