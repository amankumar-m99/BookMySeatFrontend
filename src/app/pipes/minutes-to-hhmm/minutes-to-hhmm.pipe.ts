import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesTohhmm'
})
export class MinutesToHHMMPipe implements PipeTransform {

  transform(minutes: number): unknown {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    // let formattedHours = String(hours).padStart(2, '0');
    // let formattedMinutes = String(remainingMinutes).padStart(2, '0');
    let formattedHours = String(hours);
    let formattedMinutes = String(remainingMinutes);
    return `${formattedHours}h ${formattedMinutes}m`;
  }

}
