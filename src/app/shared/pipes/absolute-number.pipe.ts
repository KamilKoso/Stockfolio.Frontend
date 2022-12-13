import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'absoluteNumber' })
export class AbsoluteNumberPipe implements PipeTransform {
  transform(number: number): number {
    return Math.abs(number);
  }
}
