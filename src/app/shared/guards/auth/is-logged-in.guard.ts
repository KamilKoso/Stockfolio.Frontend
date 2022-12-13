import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router, CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot, RouterState, UrlSegment } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Global } from 'src/global';
import { UserService } from '../../services/user/user.service';

@Injectable({ providedIn: 'root' })
export class IsLoggedInGuard implements CanActivate, CanLoad {
  constructor(private _userService: UserService,
              private _router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.isLoggedIn(segments.toString());
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.isLoggedIn(state.url);
  }

  isLoggedIn(returnUrl: Nullable<string> = null): Observable<boolean | UrlTree> {
    return this._userService.isLoggedIn$.pipe(
      map(isLoggedIn => {
        if (!isLoggedIn) {
          return this._router.parseUrl(`/login${returnUrl != null ? `?${Global.returnUrlQueryParam}=${returnUrl}`: ''}`);
        }
        return true;
      })
    );
  }
}
