import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieBookingShowDTO } from 'src/app/model/movie-booking-show.dto';
import { Movie } from 'src/app/model/movie.model';
import { MovieService } from 'src/app/services/movie/movie.service';
import { ShowtimeService } from 'src/app/services/showtime/showtime.service';
import { DateUtils } from 'src/app/utils/date-utils';

@Component({
  selector: 'app-movie-booking',
  templateUrl: './movie-booking.component.html',
  styleUrls: ['./movie-booking.component.css']
})
export class MovieBookingComponent {

  movieId: number;
  movie: Movie;
  movieBookingShowDTO?: MovieBookingShowDTO[];
  bookingForm: FormGroup;
  minDate = DateUtils.getTodayDateString();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private showtimeService: ShowtimeService,
    private formbuilder: FormBuilder
  ) {
    this.movieId = 0;
    this.movie = Movie.getDummyMovie();
    this.bookingForm = this.formbuilder.group({
      bookingDate: [DateUtils.getTodayDateString(), Validators.required]
    });
    if (this.activatedRoute.snapshot.paramMap?.has("movieId")) {
      this.movieId = Number(this.activatedRoute.snapshot.paramMap.get("movieId"));
      this.fetchData();
      this.fetchShows();
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

  fetchShows(): void{
    let dateStr = this.bookingForm.get("bookingDate")?.value;
    this.showtimeService.findShowtimeByMovieId(this.movieId, new Date(Date.parse(dateStr))).subscribe({
      next: (response) => {
        this.movieBookingShowDTO = response;
      },
      error: (error) => {
      }
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

  showBoxClicked(theaterId: number, showtimeId: number) {
    this.router.navigate(['/dashboard/seat-selection', theaterId, showtimeId])
  }

  submitBookingForm(): void{
    this.fetchShows();
  }
}
