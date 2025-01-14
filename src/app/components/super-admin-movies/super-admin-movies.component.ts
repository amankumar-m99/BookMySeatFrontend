import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/model/movie.model';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-super-admin-movies',
  templateUrl: './super-admin-movies.component.html',
  styleUrls: ['./super-admin-movies.component.css']
})
export class SuperAdminMoviesComponent {

  movies?: Movie[];
  addMovieForm: FormGroup;

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
      description: ['', Validators.required],
    });
  }

  fetchMovies() {
    this.movieService.getAllMovies().subscribe({
      next: (response) => this.movies = response,
      error: (error) => this.toastr.error("Error", error.message)
    })
  }

  submitMovie(): void {
    //
  }
}
