import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/model/movie.model';
import { EncryptionService } from 'src/app/services/encryption/encryption.service';
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
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private encryption: EncryptionService
  ) {
    this.movies = [];
    this.theaterId = 0;
    this.addedMovieIds = [];
    if (this.activatedRoute.snapshot.paramMap?.has("theaterId")) {
      let obj = this.activatedRoute.snapshot.paramMap.get("theaterId");
      if(obj != undefined && obj != null){
        this.theaterId = Number(this.encryption.decrypt(obj));
      }
      if(this.theaterId > 0){
        this.fetchAddedMovies();
      }
    }
  }

  fetchAddedMovies() {
    this.theaterService.getTheaterById(this.theaterId).subscribe({
      next: (response) => {
        this.addedMovieIds = response.movies.map(m => m.id);
        this.fetchAllMovies();
      },
      error: (error) => {
        this.toastr.error("Error", error.message);
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
        this.toastr.error("Error", error.message);
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
        this.toastr.error("Error", error.message);
      }
    })
  }

  isMovieAdded(movieId: number): boolean {
    let result = this.addedMovieIds.find(x => x == movieId);
    if (result != undefined) {
      return true;
    }
    return false;
  }
}
