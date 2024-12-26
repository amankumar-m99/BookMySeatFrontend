import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieData } from 'src/app/data/cookie.data';
import { LoginFormModel } from 'src/app/model/login-form.model';
import { Movie } from 'src/app/model/movie.model';
import { LoginService } from 'src/app/services/login/login.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { TheaterService } from 'src/app/services/theater/theater.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  form: FormGroup;
  movies: Movie[];

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private theaterService: TheaterService,
    private movieService: MovieService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) {
    this.movies = [];
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
      let theaterId = Number(this.activatedroute.snapshot.paramMap.get("theaterId"));
      this.fetchData(theaterId);
    }
  }

  fetchData(theaterId: number): void {
    this.theaterService.getTheaterById(theaterId).subscribe({
      next: (response) => {
        if (response.movieIds.length < 1)
          return;
        this.movieService.getAllMoviesByIds(response.movieIds).subscribe({
          next: (response) => {
            this.movies = response;//.map(m => m.title + "-" + m.releaseDate.getFullYear());
          },
          error: (error) => {
            alert("error in fetching movies:" + error.message);
          }
        })
      },
      error: (error) => {
        alert(error);
      },
      complete: () => { }
    });
  }

  submit(): void {
    let username: string = this.form.get("username")?.value;
    let password: string = this.form.get("password")?.value;
    let formModel = new LoginFormModel(username, password);
    this.loginService.login(formModel).subscribe({
      next: (user) => {
        CookieData.setCookie("userId", "" + user.id);
        let role = user.role;
        if (role == "superadmin") {
          this.router.navigate(["super-admin"]);
        }
        else if (role == "theateradmin") {
          this.router.navigate(["theater-admin"]);
        }
        else {
          this.router.navigate(["user"]);
        }
      },
      error: (error) => {
        alert(error.status + " " + error.message);
      },
      complete: () => { }
    });
  }
}
