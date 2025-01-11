import { Component } from '@angular/core';
import { Movie } from 'src/app/model/movie.model';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-super-admin-movies',
  templateUrl: './super-admin-movies.component.html',
  styleUrls: ['./super-admin-movies.component.css']
})
export class SuperAdminMoviesComponent {
  movies?: Movie[];

  constructor(private movieService: MovieService) {
    this.fetchMovies();
  }

  fetchMovies() {
    this.movieService.getAllMovies().subscribe({
      next: (response) => {
        this.movies = response;
      },
      error: (error) => {
        alert("Error " + error.status + ", " + error.message);
      }
    })
  }
}
