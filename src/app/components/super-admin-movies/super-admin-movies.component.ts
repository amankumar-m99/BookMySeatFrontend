import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { defaultUrlMatcher } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/model/movie.model';
import { MovieAddForm } from 'src/app/model/movie/movie-add.model';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-super-admin-movies',
  templateUrl: './super-admin-movies.component.html',
  styleUrls: ['./super-admin-movies.component.css']
})
export class SuperAdminMoviesComponent {

  movies?: Movie[];
  quickMovie: Movie = new Movie(0, "", "", "", 0, "", 0, "", new Date(), []);;
  addMovieForm: FormGroup;
  isFormSubmissionInProcess = false;

  @ViewChild('addMovieFormSubmitButton') addMovieFormSubmitButton!: ElementRef;
  @ViewChild('cancelAddMovieModalButton') cancelAddMovieModalButton!: ElementRef;
  @ViewChild('quickViewMovieModalLaunch') quickViewMovieModalLaunch!: ElementRef;

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.fetchMovies();
    this.addMovieForm = this.formBuilder.group({
      title: ['', Validators.required],
      releaseDate: ['', Validators.required],
      duration: ['', Validators.required],
      genre: ['', Validators.required],
      rating: ['', Validators.required],
      language: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  fetchMovies() {
    this.movieService.getAllMovies().subscribe({
      next: (response) => this.movies = response,
      error: (error) => this.toastr.error("Error", error.message)
    })
  }

  modalSubmitButtonClicked(): void {
    this.addMovieFormSubmitButton.nativeElement.click();
  }
  
  qickViewMovie(movie: Movie): void {
    this.quickMovie = movie;
    this.quickViewMovieModalLaunch.nativeElement.click();
  }

  submitMovie(): void {
    if (!this.addMovieForm.valid) {
      this.toastr.error("Please fill all the fields", "Error");
      return;
    }
    let title = this.addMovieForm.get("title")?.value;
    let description = this.addMovieForm.get("description")?.value;
    let genre = this.addMovieForm.get("genre")?.value;
    let duration = Number(this.addMovieForm.get("duration")?.value);
    let language = this.addMovieForm.get("language")?.value;
    let rating = Number(this.addMovieForm.get("rating")?.value);
    let releaseDate = new Date(Date.parse(this.addMovieForm.get("releaseDate")?.value));
    let model = new MovieAddForm(title, description, genre, duration, language, rating, releaseDate);
    this.isFormSubmissionInProcess = true;
    this.movieService.addMovie(model).subscribe({
      next: (response) => {
        this.movies?.push(response);
        this.toastr.success("Movie added.", "Sucess");
        this.cancelAddMovieModalButton.nativeElement.click();
        this.addMovieForm.reset();
        this.isFormSubmissionInProcess = false;
      },
      error: (error) => {
        this.toastr.error("Couldn't add movie!", "Error " + error.status);
        this.isFormSubmissionInProcess = false;
      },
      complete: () => this.isFormSubmissionInProcess = false
    })
  }
}
