import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StockfolioHttpClient } from '../http/stockfolio-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ApiHealthCheckService {
  constructor(private _http: StockfolioHttpClient) {}
  public healthCheckUrl = environment.apiUrl;

  isHealthy(): Observable<boolean> {
    return this._http.get(this.healthCheckUrl).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
