import { Component } from '@angular/core';
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

  constructor(
    private movieService: MovieService,
    private toastr: ToastrService
  ) {
    this.fetchMovies();
  }

  fetchMovies() {
    this.movieService.getAllMovies().subscribe({
      next: (response) => this.movies = response,
      error: (error) => this.toastr.error("Error", error.message)
    })
  }
}
