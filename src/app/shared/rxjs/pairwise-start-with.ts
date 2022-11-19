import { Observable, pairwise, startWith } from 'rxjs';

export function pairwiseStartWith<T>(value: T | undefined | null) {
  return function (source: Observable<T>) {
    return source.pipe(
      startWith(value), // just to fill-in the buffer
      pairwise()
    );
  };
}
