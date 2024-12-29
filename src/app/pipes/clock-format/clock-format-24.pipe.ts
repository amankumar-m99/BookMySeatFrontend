import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clockFormat24'
})
export class ClockFormat24Pipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
