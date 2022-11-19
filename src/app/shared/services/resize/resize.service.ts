import { Injectable } from '@angular/core';
import { distinctUntilChanged, fromEvent, map, Observable, startWith, tap } from 'rxjs';
import { pairwiseStartWith } from '../../rxjs/pairwise-start-with';
import { Breakpoint } from './breakpoint';
import { ScreenSize } from './screen-size';

@Injectable({
  providedIn: 'root',
})
export class ResizeService {
  private body = document.getElementsByTagName('body')[0];
  private breakpoints = [
    { name: Breakpoint.XS, maxWidth: 575.98 },
    { name: Breakpoint.SM, maxWidth: 767.98 },
    { name: Breakpoint.MD, maxWidth: 991.98 },
    { name: Breakpoint.LG, maxWidth: 1199.98 },
    { name: Breakpoint.XL, maxWidth: 1399.98 },
    { name: Breakpoint.XXL, maxWidth: 1400 },
  ];

  public screenSize$: Observable<ScreenSize> = fromEvent(window, 'resize').pipe(
    map(() => ({ width: document.body.clientWidth, height: document.body.clientHeight })),
    startWith({ width: document.body.clientWidth, height: document.body.clientHeight }),
    distinctUntilChanged()
  );

  public breakpoints$ = this.screenSize$.pipe(
    map((screenSize: ScreenSize) => this.breakpoints.find(breakpoint => breakpoint.maxWidth >= screenSize.width)?.name ?? Breakpoint.XXL),
    distinctUntilChanged(),
    pairwiseStartWith(null),
    tap(([previousBreakpoint, currentBreakpoint]) => {
      if (previousBreakpoint != null) {
        this.body.classList.remove(previousBreakpoint);
      }
      this.body.classList.add(currentBreakpoint);
    }),
    map(([, currentBreakpoint]) => currentBreakpoint)
  );

  constructor() {
    this.breakpoints$.subscribe();
    this.screenSize$.subscribe();
  }
}
