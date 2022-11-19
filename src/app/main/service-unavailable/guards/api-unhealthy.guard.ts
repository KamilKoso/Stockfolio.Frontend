import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ApiHealthCheckService } from 'src/app/shared/services/health-check/api-health-check.service';

@Injectable()
export class ApiUnhealthyGuard implements CanActivate {
  constructor(private _apiHealthCheckService: ApiHealthCheckService, private _router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this._apiHealthCheckService.isHealthy().pipe(
      map(isHealthy => {
        console.log(isHealthy);
        if (isHealthy) {
          return this._router.parseUrl('/');
        } else {
          return true;
        }
      })
    );
  }
}
