import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/model/movie.model';

@Component({
  selector: 'app-quick-view-movie',
  templateUrl: './quick-view-movie.component.html',
  styleUrls: ['./quick-view-movie.component.css']
})
export class QuickViewMovieComponent {

  @Input('movie')movie: Movie = new Movie(0, "", "", "", 0, "", 0, "", new Date(), []);

}
