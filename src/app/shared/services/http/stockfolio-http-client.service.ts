import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as URI from 'urijs';
import { QueryParameters } from './query-parameters';
import { RequestBody } from './request-body';
import { RequestData } from './request-data';

@Injectable({
  providedIn: 'root',
})
export class StockfolioHttpClient {
  constructor(private readonly _http: HttpClient) {}

  get<T>(uriTemplate: string, queryParameters?: QueryParameters, ): Observable<T> {
    const url: string = this.buildUrl(uriTemplate, queryParameters?.segmentParams, queryParameters?.queryParams);
    return this._http.get<T>(url);
  }

  getBlob(uriTemplate: string, queryParameters?: QueryParameters): Observable<Blob> {
    const url: string = this.buildUrl(uriTemplate, queryParameters?.segmentParams, queryParameters?.queryParams);
    return this._http.get(url, { responseType: 'blob' });
  }

  post<T>(uriTemplate: string, requestBody?: RequestBody): Observable<T> {
    const url: string = this.buildUrl(uriTemplate, requestBody?.segmentParams, requestBody.queryParams);
    return this._http.post<T>(url, requestBody?.body);
  }

  postBlob(uriTemplate: string, requestBody?: RequestBody): Observable<Blob> {
    const url: string = this.buildUrl(uriTemplate, requestBody?.segmentParams, requestBody.queryParams);
    return this._http.post(url, requestBody?.body, { responseType: 'blob' });
  }

  put<T>(uriTemplate: string, requestBody?: RequestBody): Observable<T> {
    const url: string = this.buildUrl(uriTemplate, requestBody?.segmentParams, requestBody.queryParams);
    return this._http.put<T>(url, requestBody?.body);
  }

  patch<T>(uriTemplate: string, requestBody?: RequestBody): Observable<T> {
    const url: string = this.buildUrl(uriTemplate, requestBody?.segmentParams, requestBody.queryParams);
    return this._http.patch<T>(url, requestBody?.body);
  }

  delete<T>(uriTemplate: string, queryParameters?: QueryParameters): Observable<T> {
    const url: string = this.buildUrl(uriTemplate, queryParameters?.segmentParams, queryParameters.queryParams);
    return this._http.delete<T>(url);
  }

  private buildUrl(uriTemplate: string, segmentParams?: RequestData, queryParams?: RequestData): string {
    this.parseDateValues(segmentParams);
    this.parseDateValues(queryParams);

    if (segmentParams) {
      uriTemplate = URI.expand(uriTemplate, segmentParams);
    }

    let uri = URI(uriTemplate);

    if (queryParams) {
      uri = uri.query(queryParams);
    }

    return uri.toString();
  }

  private parseDateValues(params: any): void {
    if (params) {
      for (const prop in params) {
        if (params[prop]?.constructor === Date) {
          params[prop] = params[prop].toISOString();
        }
      }
    }
  }
}
