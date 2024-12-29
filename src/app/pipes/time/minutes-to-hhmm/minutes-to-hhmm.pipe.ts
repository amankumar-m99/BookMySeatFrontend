import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToHhmm'
})
export class MinutesToHhmmPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
