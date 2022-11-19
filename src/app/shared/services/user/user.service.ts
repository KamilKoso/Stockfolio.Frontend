import { Injectable } from '@angular/core';
import { catchError, map, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StockfolioHttpClient } from '../http/stockfolio-http-client.service';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class UserService {
  public userSubject = new Subject<Nullable<User>>();

  public isLoggedIn$ = this.userSubject.asObservable().pipe(map(user => user != null));
  public user$ = this.userSubject.asObservable();

  constructor(private _http: StockfolioHttpClient) {
    this.getUser();
  }

  login(email: string, password: string): void {
    this._http.post<User>(`${environment.apiUrl}/account/sign-in`, { body: { email, password } }).pipe(
      tap(user => this.userSubject.next(user)),
      catchError(err => {
        this.userSubject.next(null);
        return throwError(() => err);
      })
    );
  }

  getUser(): void {
    this._http
      .get<User>(`${environment.apiUrl}/account`)
      .pipe(tap(user => this.userSubject.next(user)))
      .subscribe();
  }
}
