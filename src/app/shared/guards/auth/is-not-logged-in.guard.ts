import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  Router,
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  RouterState,
  UrlSegment,
} from '@angular/router';
import { map, Observable, of, take } from 'rxjs';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Global } from 'src/global';

@Injectable({ providedIn: 'root' })
export class IsNotLoggedInGuard implements CanActivate, CanLoad {
  constructor(private _userService: UserService, private _router: Router) {}

  canLoad(): Observable<boolean | UrlTree> {
    const currentNavigation = this._router.getCurrentNavigation();
    const isInitialNavigation = !currentNavigation.previousNavigation;
    return this.isNotLoggedIn(currentNavigation.extractedUrl.queryParams[Global.returnUrlQueryParam], isInitialNavigation);
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.isNotLoggedIn(route.queryParams[Global.returnUrlQueryParam]);
  }

  isNotLoggedIn(returnUrl: Nullable<string> = null, isInitialNavigation = false): Observable<boolean | UrlTree> {
    return this._userService.isLoggedIn$.pipe(
      take(1),
      map(isLoggedIn => {
        if (!isLoggedIn) {
          return true;
        }
        return isInitialNavigation ? false : this._router.parseUrl(returnUrl ?? '/');
      })
    );
  }
}
