import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/model/movie.model';
import { MovieAddForm } from 'src/app/model/movie/movie-add.model';
import { EncryptionService } from 'src/app/services/encryption/encryption.service';
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

  @ViewChild("addMovieModalButton") addMovieModalButton!: ElementRef;
  @ViewChild("closeAddMovieModalButton") closeAddMovieModalButton!: ElementRef;
  @ViewChild("quickViewMovieModalLaunch") quickViewMovieModalLaunch!: ElementRef;

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private encryption: EncryptionService
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

  quickViewMovie(movie: Movie): void {
    this.quickMovie = movie;
    this.quickViewMovieModalLaunch.nativeElement.click();
  }

  openAddMovieModal(): void {
    this.initAddMovieModal();
    this.openAddMovieModal
  }

  initAddMovieModal(): void {
    this.addMovieForm.reset();
    this.addMovieModalButton.nativeElement.click();
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
        this.closeAddMovieModalButton.nativeElement.click();
        this.isFormSubmissionInProcess = false;
      },
      error: (error) => {
        this.toastr.error("Couldn't add movie!", "Error " + error.status);
        this.isFormSubmissionInProcess = false;
      },
      complete: () => this.isFormSubmissionInProcess = false
    })
  }

  encryptedId(id: number): string {
    return this.encryption.encrypt(String(id));
  }
}
