import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/model/movie.model';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent {
  movies: Movie[];

  constructor(
    private movieService: MovieService,
    private toastr: ToastrService
  ) {
    this.movies = [];
  }

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.movieService.getAllMovies().subscribe({
      next: (response) => {
        this.movies = response;
      },
      error: (error) => {
        this.toastr.error("Error", error.message);
      },
      complete: () => { }
    });
  }
}
