import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, timer } from 'rxjs';

@Injectable()
export class HttpRetryInterceptor implements HttpInterceptor {
  retryCount = 3;
  retryWaitMilliSeconds = 1000;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(retry({ count: this.retryCount, delay: this.shouldRetry }));
  }

  private shouldRetry(error: HttpErrorResponse) {
    if (error instanceof HttpErrorResponse && (error.status === 0 || error.status === 503)) {
      return timer(1000);
    }

    throw error;
  }
}
