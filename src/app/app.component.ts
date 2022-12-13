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
    this.getUsersLocale();
  }

  getUsersLocale(): string {
    const wn = window.navigator as any;
    let lang = wn.languages[0];
    lang = lang || wn.language || wn.browserLanguage || wn.userLanguage;
    console.log(lang);
    return lang;
  }
}
