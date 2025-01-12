import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'releaseDatePhrase'
})
export class ReleaseDatePhrasePipe implements PipeTransform {

  transform(releaseDate: Date): string {
    let currentDate = new Date();
    let val = "Releasing on";
    if (currentDate <= releaseDate) {
      val = "Releasing on ";
    }
    else if (currentDate == releaseDate) {
      val = "Releasing today, ";
    }
    else {
      val = "Released on ";
    }
    return val;
  }

}
