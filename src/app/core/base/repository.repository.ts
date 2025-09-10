import { HttpClient, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export abstract class Repository {
  private paths = Object.freeze({
    localhost: 'http://127.0.0.1:8000',
    prod: 'https://backend-k6io.onrender.com',
  });

  protected basePath = this.paths.prod;
  protected http: HttpClient;

  constructor(protected injector: Injector) {
    this.http = this.injector.get(HttpClient);
  }

  protected doRequest<T>(
    method: keyof HttpClient,
    url: string,
    options?: { params?: any; body?: any }
  ): Observable<T> {
    // Si es GET o HEAD, no enviar body
    const opts: any = { ...options };
    if (method === 'get' || method === 'head') {
      delete opts.body;
    }
    return this.http
      .request<T>(method, `${this.basePath}${url}`, { ...opts, observe: 'response' })
      .pipe(
        filter((event: any) => event instanceof HttpResponse),
        map((event: HttpResponse<T>) => event.body as T)
      );
  }
}
