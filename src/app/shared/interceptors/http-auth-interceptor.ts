import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user/user.service';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(private _userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.includes(environment.apiUrl)) {
      req = req.clone({withCredentials: true});
    }

    return next.handle(req).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this._userService.userSubject.next(null);
          return EMPTY;
        }
        return throwError(() => err);
      })
    );
  }
}
