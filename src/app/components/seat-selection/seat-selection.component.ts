import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { Showtime } from 'src/app/model/showtime.model';
import { Theater } from 'src/app/model/theater.model';
import { MovieService } from 'src/app/services/movie/movie.service';
import { TheaterService } from 'src/app/services/theater/theater.service';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent {

  movie?: Movie;
  theaterId: number = 0;
  theater?: Theater;
  showtimeId: number = 0;
  showtime?: Showtime;
  cols = [1,2,3,4,5,6]
  rows = ['A', 'B', 'C', 'D', 'E']
  selectionCount:number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private theaterService: TheaterService
  ) {
    if (this.activatedRoute.snapshot.paramMap?.has("showtimeId")) {
      this.showtimeId = Number(this.activatedRoute.snapshot.paramMap.get("showtimeId"));
      if (this.activatedRoute.snapshot.paramMap?.has("theaterId")) {
        this.theaterId = Number(this.activatedRoute.snapshot.paramMap.get("theaterId"));
        this.fetchData();
      }
    }
  }

  fetchData(): void {
    this.theaterService.getTheaterById(this.theaterId).subscribe({
      next: (response) => {
        this.theater = response;
        this.showtime = this.theater.showtimes.find(x => x.id == this.showtimeId);
        this.movie = this.theater.movies.find(x => x.id == this.showtime?.movie.id);
      },
      error: (error) => { },
      complete: () => { }
    });
  }

}
