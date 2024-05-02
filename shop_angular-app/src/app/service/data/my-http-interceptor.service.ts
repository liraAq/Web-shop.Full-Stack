import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyHttpInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the authentication token from wherever it's stored (e.g., localStorage)
    const token = localStorage.getItem('token');

    // Clone the request and add the 'Authorization' header with the token
    if (token) {
      request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        },
      });
    }

    // Pass the modified request to the next handler
    return next.handle(request);
  }
}
