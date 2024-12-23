import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-movie-booking',
  templateUrl: './movie-booking.component.html',
  styleUrls: ['./movie-booking.component.css']
})
export class MovieBookingComponent {

  movieId: number;
  movie: Movie;
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {
    this.movieId = 0;
    this.movie = Movie.getDummyMovie();
    if (this.activatedRoute.snapshot.paramMap?.has("movieId")) {
      this.movieId = Number(this.activatedRoute.snapshot.paramMap.get("movieId"));
      this.fetchData();
    }
  }

  fetchData(): void {
    this.movieService.getMovieById(this.movieId).subscribe({
      next: (response) => {
        this.movie = response;
      },
      error: (error) => { },
      complete: () => { }
    });
  }

  convertMinutesToHHMM(minutes: number) {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    // let formattedHours = String(hours).padStart(2, '0');
    // let formattedMinutes = String(remainingMinutes).padStart(2, '0');
    let formattedHours = String(hours);
    let formattedMinutes = String(remainingMinutes);
    return `${formattedHours}h ${formattedMinutes}m`;
  }
}
