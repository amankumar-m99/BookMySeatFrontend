import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leadingZeros'
})
export class LeadingZerosPipe implements PipeTransform {

  transform(value: number, digits: number = 2): string {
    return value.toString().padStart(digits, '0');
  }

}
