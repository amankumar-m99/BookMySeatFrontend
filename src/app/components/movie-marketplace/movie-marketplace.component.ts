import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { MovieService } from 'src/app/services/movie/movie.service';
import { TheaterService } from 'src/app/services/theater/theater.service';

@Component({
  selector: 'app-movie-marketplace',
  templateUrl: './movie-marketplace.component.html',
  styleUrls: ['./movie-marketplace.component.css']
})
export class MovieMarketplaceComponent {

  movies: Movie[];
  addedMovieIds: number[];
  theaterId: number;

  constructor(
    private theaterService: TheaterService,
    private movieService: MovieService,
    private activatedroute: ActivatedRoute
  ) {
    this.movies = [];
    this.theaterId = 0;
    this.addedMovieIds = [];
    if (this.activatedroute.snapshot.paramMap?.has("theaterId")) {
      this.theaterId = Number(this.activatedroute.snapshot.paramMap.get("theaterId"));
    }
  }

  ngOnInit(): void {
    this.fetchAddedMovies();
  }

  fetchAddedMovies() {
    this.theaterService.getTheaterById(this.theaterId).subscribe({
      next: (response) => {
        this.addedMovieIds = response.movies.map(m => m.id);
        this.fetchAllMovies();
      },
      error: (error) => {
        alert(error);
      },
      complete: () => { }
    });
  }

  fetchAllMovies(): void {
    this.movieService.getAllMovies().subscribe({
      next: (response) => {
        this.movies = response;
      },
      error: (error) => {
        alert(error.message);
      },
      complete: () => { }
    });
  }

  addMovieToTheater(movieId: number): void {
    this.theaterService.addMovieToTheater(this.theaterId, movieId).subscribe({
      next: (respnse) => {
        this.addedMovieIds.push(movieId);
      },
      error: (error) => {
        alert(error.message)
      }
    })
  }

  isMovieAdded(movieId: number): boolean {
    let result = this.addedMovieIds.find(x => x == movieId);
    if(result != undefined){
      return true;
    }
    return false;
  }
}
