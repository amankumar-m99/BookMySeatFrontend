import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clockFormat12'
})
export class ClockFormat12Pipe implements PipeTransform {

  transform(time24hr: string): string {
    // Split the time into hours and minutes
    let [hours, minutes] = time24hr.split(":").map(Number);

    // Determine AM or PM
    const period = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    const hours12 = hours % 12 || 12; // Adjust 0 to 12 for midnight

    // Return the formatted time
    return `${String(hours12).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
  }
}
