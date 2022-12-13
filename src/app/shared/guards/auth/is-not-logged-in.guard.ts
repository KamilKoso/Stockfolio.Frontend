import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router, CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot, RouterState, UrlSegment } from '@angular/router';
import { map, Observable, of, take } from 'rxjs';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Global } from 'src/global';

@Injectable({ providedIn: 'root' })
export class IsNotLoggedInGuard implements CanActivate, CanLoad {
  constructor(private userService: UserService,
              private router: Router) {}

  canLoad(): Observable<boolean | UrlTree> {
    const currentNavigation = this.router.getCurrentNavigation();
    const isInitialNavigation = !currentNavigation.previousNavigation;
    return this.isLoggedIn(currentNavigation.extractedUrl.queryParams[Global.returnUrlQueryParam], isInitialNavigation);
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.isLoggedIn(route.queryParams[Global.returnUrlQueryParam]);
  }

  isLoggedIn(returnUrl: Nullable<string> = null, isInitialNavigation: boolean = false): Observable<boolean | UrlTree> {
    return this.userService.isLoggedIn$.pipe(
      take(1),
      map(isLoggedIn => {
        if (!isLoggedIn) {
          return true;
        }
        return isInitialNavigation ? false : this.router.parseUrl(returnUrl ?? '/');
      })
    );
  }
}
