import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs"
import { tap } from "rxjs/operators"
import { CacheService } from '../services/cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

	constructor(private cacheService: CacheService) { }

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (req.method !== 'GET') {
			return next.handle(req);
		}

		const cachedResponse = this.cacheService.get(req.urlWithParams);

		if (cachedResponse) {
			return of(cachedResponse);
		}

		return next.handle(req).pipe(
			tap((event) => {
				if (event instanceof HttpResponse) {
					const cacheControl = event.headers.get('Cache-Control');
					const maxAgeMatch = cacheControl && cacheControl.match(/max-age=(\d+)/);
					const expiryMs = maxAgeMatch ? parseInt(maxAgeMatch[1]) * 1000 : 60000; // Default expiry of 1 minute

					this.cacheService.set(req.urlWithParams, event, expiryMs);
				}
			})
		);
	}
}