import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieBookingShowDTO } from 'src/app/model/movie-booking-show.dto';
import { Movie } from 'src/app/model/movie.model';
import { EncryptionService } from 'src/app/services/encryption/encryption.service';
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
    private formbuilder: FormBuilder,
    private encryption: EncryptionService
  ) {
    this.movieId = 0;
    this.movie = Movie.getDummyMovie();
    this.bookingForm = this.formbuilder.group({
      bookingDate: [DateUtils.getTodayDateString(), Validators.required]
    });
    this.movieId = Number(this.encryption.decryptRouteParam(this.activatedRoute, "movieId"));
    if (this.movieId > 0) {
      this.fetchData();
      this.fetchShows(this.selectedDate);
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

  fetchShows(date: Date): void {
    this.showtimeService.findShowtimeByMovieId(this.movieId, date).subscribe({
      next: (response) => {
        this.movieBookingShowDTO = response;
      },
      error: (error) => {
      }
    });
  }

  showBoxClicked(theaterId: number, showtimeId: number) {
    this.router.navigate(['/dashboard/seat-selection', this.encryptedId(theaterId), this.encryptedId(showtimeId)])
  }

  submitBookingForm(): void {
    this.fetchShows(this.selectedDate);
  }
  
  handleDateSelectedEvent(date: Date): void {
    this.bookingForm.get("bookingDate")?.patchValue(date);
  }

  encryptedId(id: number): string {
    return this.encryption.encrypt(String(id));
  }

  get selectedDate(): Date {
    return new Date(Date.parse(this.bookingForm.get("bookingDate")?.value));
  }
}
