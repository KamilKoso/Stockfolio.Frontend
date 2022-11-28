import { Injectable } from '@angular/core';
import { distinctUntilChanged, fromEvent, map, Observable, startWith } from 'rxjs';
import { ScreenSize } from './screen-size';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  public screenSize$: Observable<ScreenSize> = fromEvent(window, 'resize').pipe(
    map(() => ({ width: document.body.clientWidth, height: document.body.clientHeight })),
    startWith({ width: document.body.clientWidth, height: document.body.clientHeight }),
    distinctUntilChanged()
  );
}
