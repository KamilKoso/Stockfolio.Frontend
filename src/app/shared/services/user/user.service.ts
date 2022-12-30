import { Injectable } from '@angular/core';
import { catchError, map, Observable, ReplaySubject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StockfolioHttpClient } from '../http/stockfolio-http-client.service';
import { LoginRequest } from './models/login-request';
import { User } from './models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  public userSubject = new ReplaySubject<Nullable<User>>();

  public isLoggedIn$ = this.userSubject.asObservable().pipe(map(user => user != null));
  public user$ = this.userSubject.asObservable();

  constructor(private _http: StockfolioHttpClient) {}

  login(request: LoginRequest): Observable<User> {
    return this._http.post<User>(`${environment.apiUrl}/account/sign-in`, { body: request }).pipe(
      tap(user => this.userSubject.next(user)),
      catchError(err => {
        this.userSubject.next(null);
        return throwError(() => err);
      })
    );
  }

  signout(): Observable<void> {
    return this._http.post(`${environment.apiUrl}/account/sign-out`).pipe(tap<void>(() => this.userSubject.next(null)));
  }

  getUser(): Observable<User> {
    return this._http.get<User>(`${environment.apiUrl}/account`).pipe(
      tap(user => this.userSubject.next(user)),
      catchError(err => {
        if (err.status === 401 || err.status === 0) {
          this.userSubject.next(null);
        }
        return throwError(() => err);
      })
    );
  }
}
