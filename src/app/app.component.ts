import { Component } from '@angular/core';
import { ThemeService } from './shared/services/theme/theme.service';
import { UserService } from './shared/services/user/user.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(_userService: UserService, _themeService: ThemeService) {
    _userService.getUser().subscribe();
    _themeService.theme$.subscribe();
  }
}
