import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, of } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { pairwiseStartWith } from '../../rxjs/pairwise-start-with';
import { Themes } from './themes-enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private localStorageThemeKey = 'stockfolio-theme';
  private body = document.documentElement;
  private themeSubject$: BehaviorSubject<Themes> = new BehaviorSubject(
    (localStorage.getItem(this.localStorageThemeKey) as Themes) ?? Themes.SameAsDeviceTheme
  );

  public theme$: Observable<Themes> = this.themeSubject$.pipe(
    tap(theme => localStorage.setItem(this.localStorageThemeKey, theme)),
    switchMap((theme: Themes) => (theme == Themes.SameAsDeviceTheme ? this.detectUserTheme$() : of(theme))),
    pairwiseStartWith(null),
    tap(([previousTheme, currentTheme]) => {
      if (previousTheme != null) {
        this.body.classList.remove(previousTheme);
      }
      this.body.classList.add(currentTheme);
    }),
    map(() => localStorage.getItem(this.localStorageThemeKey) as Themes)
  );

  changeTheme(theme: Themes) {
    this.themeSubject$.next(theme);
  }

  private detectUserTheme$(): Observable<Themes> {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    return fromEvent(mediaQueryList, 'change').pipe(
      startWith(mediaQueryList),
      map((ev: MediaQueryListEvent) => (ev.matches ? Themes.Dark : Themes.Light))
    );
  }
}
