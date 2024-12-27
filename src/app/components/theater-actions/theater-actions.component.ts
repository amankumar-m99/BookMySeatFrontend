import { R3SelectorScopeMode } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { Theater } from 'src/app/model/theater.model';
import { MovieService } from 'src/app/services/movie/movie.service';
import { TheaterService } from 'src/app/services/theater/theater.service';

@Component({
  selector: 'app-theater-actions',
  templateUrl: './theater-actions.component.html',
  styleUrls: ['./theater-actions.component.css']
})
export class TheaterActionsComponent {

  theaterId: number;
  theater?: Theater;

  constructor(
    private theaterService: TheaterService,
    private movieService: MovieService,
    private activatedroute: ActivatedRoute
  ) {
    this.theaterId = 0;
    if (this.activatedroute.snapshot.paramMap?.has("theaterId")) {
      this.theaterId = Number(this.activatedroute.snapshot.paramMap.get("theaterId"));
      this.fetchData();
    }
  }

  fetchData(): void {
    this.theaterService.getTheaterById(this.theaterId).subscribe({
      next: (response) => {
        this.theater = response;
      },
      error: (error) => {
        alert(error);
      },
      complete: () => { }
    });
  }

  getRouterLink(): string {
    return "/movie-marketplace/" + this.theaterId;
  }

}
