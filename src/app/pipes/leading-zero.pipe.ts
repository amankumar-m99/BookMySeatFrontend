import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leadingZero'
})
export class LeadingZeroPipe implements PipeTransform {

  transform(value: number, digits: number = 2): string {
    return value.toString().padStart(digits, '0');
  }

}
