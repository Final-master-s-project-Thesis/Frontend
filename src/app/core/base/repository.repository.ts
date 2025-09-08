import { HttpClient, HttpParams } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class Repository {
    private paths = Object.freeze({
        localhost: 'http://127.0.0.1:8000',
    });

    protected basePath = this.paths.localhost;
    protected http: HttpClient;

    constructor(protected injector: Injector) {
        this.http = this.injector.get(HttpClient);
    }

    protected doRequest<T>(
        method: keyof HttpClient,
        url: string,
        body?: unknown,
        params?: HttpParams
    ): Observable<T> {
        return this.http.request<T>(method, `${this.basePath}${url}`, { body, params });
    }
}