import { trigger, transition, style, animate, query } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { LanguageService } from 'src/app/shared/services/language/language.service';
import { ThemeService } from 'src/app/shared/services/theme/theme.service';
import { Themes } from 'src/app/shared/services/theme/themes-enum';
import { User } from 'src/app/shared/services/user/models/user';
import { UserService } from 'src/app/shared/services/user/user.service';

enum Views {
  Initial,
  LanguageSelect,
  ThemeSelect,
}

@Component({
  selector: 'stockfolio-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  // TODO: Throw it out to the seperate animations file
  animations: [
    trigger('preventInitialRenderChildAnimations', [transition(':enter', [query(':enter', [])])]),
    trigger('tabSwitchAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', position: 'absolute' }),
        animate('250ms cubic-bezier(0.8, 0.2, 0.2, 0.8)', style({ transform: 'translateX(0)' })),
        query(':leave', [style({ 'background-color': 'red' })], { optional: true }),
      ]),
      transition(':leave', [
        style({ position: 'absolute' }),
        animate('250ms cubic-bezier(0.8, 0.2, 0.2, 0.8)', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent {
  @Input() user: User;
  currentLang$ = this._languageService.language$;
  currentTheme$ = this._themeService.selectedTheme$;
  view: Views = Views.Initial;
  views = Views;
  supportedLanguages = this._languageService.supportedLanguages;
  supportedThemes = Object.values(Themes);

  constructor(
    private _languageService: LanguageService,
    private _themeService: ThemeService,
    private _userService: UserService,
    private _router: Router
  ) {}

  changeView(view: Views, clickEvent: MouseEvent) {
    this.view = view;
    clickEvent.stopPropagation(); // In order not to close mat-menu after changing views
  }

  changeLanguage(languageCode: string, clickEvent: MouseEvent) {
    this._languageService.changeLanguage(languageCode);
    this.view = Views.Initial;
    clickEvent.stopPropagation();
  }

  changeTheme(theme: Themes, clickEvent: MouseEvent) {
    this._themeService.changeTheme(theme);
    this.view = Views.Initial;
    clickEvent.stopPropagation();
  }

  signOut(): void {
    this._userService
      .signout()
      .pipe(switchMap(() => this._router.navigateByUrl('/login')))
      .subscribe();
  }
}
