import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plurality'
})
export class PluralityPipe implements PipeTransform {

  transform(count: number, noun: string): unknown {
    if(count == 1){
      return `${count} ${noun}`;
    }
    return `${count} ${noun}s`;
  }

}
