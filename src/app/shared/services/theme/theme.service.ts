import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import { Color } from '../../models/color';
import { pairwiseStartWith } from '../../rxjs/pairwise-start-with';
import { ThemeColors } from './theme-colors';
import { Themes } from './themes-enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private localStorageThemeKey = 'stockfolio-theme';
  private root = document.documentElement;
  private scssColorVariables = Object.getOwnPropertyNames(ThemeColors)
    .filter(x => typeof x === 'string' && x.startsWith("stockfolio"))
    .map(x => '--' + x);

  private mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
  private userThemePreference$ = fromEvent(this.mediaQueryList, 'change').pipe(
    startWith(this.mediaQueryList),
    map((ev: MediaQueryListEvent) => (ev.matches ? Themes.Dark : Themes.Light))
  );
ok

  private themeSubject$: BehaviorSubject<Themes> = new BehaviorSubject(
    (localStorage.getItem(this.localStorageThemeKey) as Themes) ?? Themes.SameAsDeviceTheme
  );

  // Theme that was selected by the user in theme selection
  public selectedTheme$: Observable<Themes> = this.themeSubject$.pipe(
    tap(theme => localStorage.setItem(this.localStorageThemeKey, theme)),
    switchMap((theme: Themes) => (theme == Themes.SameAsDeviceTheme ? this.userThemePreference$ : of(theme))),
    pairwiseStartWith(null),
    tap(([previousTheme, currentTheme]) => {
      if (previousTheme != null) {
        this.root.classList.remove(previousTheme);
      }
      this.root.classList.add(currentTheme);
    }),
    map(() => localStorage.getItem(this.localStorageThemeKey) as Themes)
  );

  // Theme that should be displayed, so it detects user prefered color scheme.
  public displayedTheme$ = this.selectedTheme$.pipe(
    switchMap((theme: Themes) => (theme == Themes.SameAsDeviceTheme ? this.userThemePreference$ : of(theme))),
    distinctUntilChanged()
  );

  public themeColors$: Observable<ThemeColors> = this.displayedTheme$.pipe(
    map(() => {
      const styles = getComputedStyle(this.root);
      const colors = {};

      this.scssColorVariables.forEach(variable => {
        colors[variable.substring(2, variable.length)] = new Color(styles.getPropertyValue(variable).trim());
      });

      return colors as ThemeColors;
    })
  );

  changeTheme(theme: Themes) {
    this.themeSubject$.next(theme);
  }
}
