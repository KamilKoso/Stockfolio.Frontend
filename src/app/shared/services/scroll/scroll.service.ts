import { Injectable } from '@angular/core';
import { fromEvent, map, pairwise } from 'rxjs';
import { ScrollDirection } from './scroll-direction';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  windowScrollOffset$ = fromEvent(window, 'scroll').pipe(
    map(() => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const percent = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);
      return percent;
    })
  );

  scrollDirection$ = this.windowScrollOffset$.pipe(
    pairwise(),
    map(([previousValue, currentValue]) => {
      if (!previousValue || currentValue > previousValue) {
        return ScrollDirection.DOWN;
      } else {
        return ScrollDirection.UP;
      }
    })
  );
}
