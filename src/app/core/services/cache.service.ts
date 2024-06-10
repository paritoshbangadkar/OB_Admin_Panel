import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CacheService {
	private cache: Map<string, { data: any, expiry: number }> = new Map();

	constructor() { }

	get(url: string): any {
		const cachedData = this.cache.get(url);
		if (cachedData && cachedData.expiry > Date.now()) {
			return cachedData.data;
		}
		return null;
	}

	set(url: string, data: any, expiryMs: number): void {
		const expiry = expiryMs > 0 ? Date.now() + expiryMs : Number.MAX_SAFE_INTEGER;
		this.cache.set(url, { data, expiry });
	}

	invalidate(url: string): void {
		this.cache.delete(url);
	}
}
