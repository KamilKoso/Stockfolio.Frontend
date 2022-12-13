import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private _router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          this.handleHttpErrors(err);
        }
        return throwError(() => err);
      })
    );
  }

  handleHttpErrors(err: HttpErrorResponse) {
      console.log(err.status);
    switch (err.status) {
      case 0: {
        this.handle0StatusCode();
        break;
      }
    }
  }

  handle0StatusCode() {
    this._router.navigateByUrl('unavailable');
  }
}
