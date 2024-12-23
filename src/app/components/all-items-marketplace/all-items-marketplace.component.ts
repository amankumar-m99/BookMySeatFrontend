import { Component } from '@angular/core';
import { Movie } from 'src/app/model/movie.model';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-all-items-marketplace',
  templateUrl: './all-items-marketplace.component.html',
  styleUrls: ['./all-items-marketplace.component.css']
})
export class AllItemsMarketplaceComponent {

  movies: Movie[];
  
    constructor(
      private movieService: MovieService
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
          alert("error");
        },
        complete: () => { }
      });
    }
  
    getRouterLink(id: number): string {
      return "/movie-marketplace/all-items/" + id;
    }
  
}
