import { Injectable } from '@angular/core';
import { catchError, map, Observable, ReplaySubject, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StockfolioHttpClient } from '../http/stockfolio-http-client.service';
import { Quote } from './models/quote';
import { QuoteDetails } from './models/quote-details';
import { SearchQuotesResponse } from './models/search-quotes-response';

@Injectable({ providedIn: 'root' })
export class StockMarketService {
  constructor(private _http: StockfolioHttpClient) {}

  search(query: string): Observable<SearchQuotesResponse> {
    return this._http.get<SearchQuotesResponse>(`${environment.apiUrl}/quotes/search`, { queryParams: { query } }).pipe(
      map(value => {
        for (let i = 0; i < value.quotes.length; i++) {
          value.quotes[i] = new Quote(value.quotes[i]);
        }
        return value;
      })
    );
  }

  getQuoteDetails(symbols: string | string[]): Observable<QuoteDetails[]> {
    const queryParams = Array.isArray(symbols) ? symbols : [symbols];
    return this._http.get<QuoteDetails[]>(`${environment.apiUrl}/quotes`, { queryParams: { symbols: queryParams } }).pipe(
      map(value => {
        for (let i = 0; i < value.length; i++) {
          value[i] = new QuoteDetails(value[i]);
        }
        return value;
      })
    );
  }
}
