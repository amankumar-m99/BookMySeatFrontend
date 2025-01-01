import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { ShowtimeForm } from 'src/app/model/showtime-form.model';
import { ShowtimeService } from 'src/app/services/showtime/showtime.service';
import { TheaterService } from 'src/app/services/theater/theater.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  form: FormGroup;
  movies: Movie[];
  theaterId: number;

  constructor(
    private formBuilder: FormBuilder,
    private theaterService: TheaterService,
    private showtimeService: ShowtimeService,
    private activatedroute: ActivatedRoute
  ) {
    this.movies = [];
    this.theaterId = 0;
    this.form = this.formBuilder.group({
      showTime1: [true, Validators.required],
      showTime2: [true, Validators.required],
      showTime3: [true, Validators.required],
      showTime4: [false, Validators.required],
      dayToday: [false, Validators.required],
      dayTomorrow: [false, Validators.required],
      dayThisWeek: [false, Validators.required],
      dayNextWeek: [true, Validators.required],
      movieId: ["0", Validators.required]
    });
    if (this.activatedroute.snapshot.paramMap?.has("theaterId")) {
      this.theaterId = Number(this.activatedroute.snapshot.paramMap.get("theaterId"));
      this.fetchData(this.theaterId);
    }
  }

  fetchData(theaterId: number): void {
    this.theaterService.getTheaterById(theaterId).subscribe({
      next: (response) => {
        this.movies = response.movies;
      },
      error: (error) => {
        alert(error);
      },
      complete: () => { }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      alert("Invalid form.");
      return;
    }
    let movieId: string = this.form.get("movieId")?.value;
    let formModel: ShowtimeForm[] = [];
    formModel.push(new ShowtimeForm(Number(movieId), 2, this.theaterId, 9, 30));
    formModel.push(new ShowtimeForm(Number(movieId), 2, this.theaterId, 1, 0));
    formModel.push(new ShowtimeForm(Number(movieId), 2, this.theaterId, 5, 0));
    formModel.push(new ShowtimeForm(Number(movieId), 2, this.theaterId, 7, 0));
    this.showtimeService.addShowtime(formModel).subscribe({
      next: (showtime) => {
        alert("Added.")
      },
      error: (error) => {
        alert(error.status + " " + error.message);
      },
      complete: () => { }
    });
  }
}
