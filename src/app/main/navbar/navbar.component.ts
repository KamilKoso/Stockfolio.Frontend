import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { distinctUntilChanged, map, startWith } from 'rxjs';
import { ScrollDirection } from 'src/app/shared/services/scroll/scroll-direction';
import { ScrollService } from 'src/app/shared/services/scroll/scroll.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { UserMenuComponent } from './components/user-menu/user-menu.component';

@Component({
  selector: 'stockfolio-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @ViewChild(UserMenuComponent) userMenuComponent: UserMenuComponent;
  authStatus$ = this._userService.isLoggedIn$;
  user$ = this._userService.user$;
  isOnTop$ = this._scrollService.windowScrollOffset$.pipe(map(offsetPercentage => offsetPercentage > 0));
  shouldHideNavbar$ = this._scrollService.scrollDirection$.pipe(
    map((scrollDirection: ScrollDirection) => scrollDirection == ScrollDirection.DOWN),
    startWith(false),
    distinctUntilChanged()
  );

  constructor(private _userService: UserService, private _scrollService: ScrollService) {}

  signout() {}
}
