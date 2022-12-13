import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { pairwiseStartWith } from '../../rxjs/pairwise-start-with';
import { Themes } from './themes-enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private localStorageThemeKey = 'stockfolio-theme';
  private body = document.documentElement;
  private themeSubject$: BehaviorSubject<Themes> = new BehaviorSubject(
    (localStorage.getItem(this.localStorageThemeKey) as Themes) ?? Themes.Light
  );

  public theme$: Observable<Themes> = this.themeSubject$.pipe(
    pairwiseStartWith(null),
    tap(([previousTheme, currentTheme]) => {
      if (previousTheme != null) {
        this.body.classList.remove(previousTheme);
      }
      localStorage.setItem(this.localStorageThemeKey, currentTheme);
      this.body.classList.add(currentTheme);
    }),
    map(([, currentTheme]) => currentTheme)
  );

  changeTheme(theme: Themes) {
    this.themeSubject$.next(theme);
  }
}
