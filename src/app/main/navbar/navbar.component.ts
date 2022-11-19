import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filter, switchMap } from 'rxjs';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'stockfolio-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  authStatus$ = this.authService.isLoggedIn$;
  user$ = this.authStatus$.pipe(
    filter(isAuthenticated => !isAuthenticated),
    switchMap(() => this.authService.user$)
  );

  constructor(private authService: UserService) {}

  signout() {}
}
