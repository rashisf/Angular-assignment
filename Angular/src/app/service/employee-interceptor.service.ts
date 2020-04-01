import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeInterceptorService implements HttpInterceptor {

  constructor() { }
  errorHandler(err: HttpErrorResponse) {
    return throwError(err);
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const clone = req.clone({ headers: headers });

    return next.handle(req)
      .pipe(catchError(this.errorHandler));
  }
}
