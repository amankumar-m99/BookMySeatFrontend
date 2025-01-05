import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { Showtime } from 'src/app/model/showtime.model';
import { Theater } from 'src/app/model/theater.model';
import { Ticket } from 'src/app/model/ticket.model';
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
  ticketArr: Ticket[][];
  classesArr: string[][];
  myBooking: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private theaterService: TheaterService
  ) {
    this.ticketArr = [];
    this.classesArr = [];
    this.myBooking = [];
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
        if (this.showtime != undefined) {
          let cols = this.showtime.screen.maximumCols;
          for (let i = 0; i < this.showtime.screen.maximumRows; i++) {
            for (let j = 0; j < cols; j++) {
              if (this.ticketArr[i] == undefined || this.ticketArr[i] == null) {
                this.ticketArr[i] = [];
                this.classesArr[i] = [];
              }
              let ticket = this.showtime?.tickets[(cols * i) + j];
              this.ticketArr[i].push(ticket);
              this.classesArr[i].push(ticket.isBooked ? "btn-outline-danger" : "btn-outline-light");
            }
          }
        }
      },
      error: (error) => { },
      complete: () => { }
    });
  }

  getTooltipContent(i: number, j: number): string {
    if (this.ticketArr[i][j].isBooked) {
      return "Taken";
    }
    let isMyBooked = this.myBooking.find(x => x == (i + ":" + j));
    if (isMyBooked == undefined || isMyBooked == null) {
      return "Available, " + '\u20B9' + this.ticketArr[i][j].price;
    }
    return "Selected, " + '\u20B9' + this.ticketArr[i][j].price;
  }

  seatClicked(i: number, j: number): void {
    if (this.ticketArr[i][j].isBooked) {
      return;
    }
    let isMyBooked = this.myBooking.find(x => x == (i + ":" + j));
    if (isMyBooked == undefined || isMyBooked == null) {
      this.classesArr[i][j] = "btn-warning";
      this.myBooking.push(i + ":" + j);
    }
    else {
      this.myBooking = this.myBooking.filter(x => x != (i + ":" + j))
      this.classesArr[i][j] = "btn-outline-light";
    }
  }
  
  clearSelection(): void {
    while(this.myBooking.length != 0){
      let value = this.myBooking.pop();
      let arr = value?.split(":");
      if(arr != undefined && arr != null){
        let i = Number(arr[0]);
        let j = Number(arr[1]);
        this.classesArr[i][j] = "btn-outline-light";
      }
    }
  }

  calculateTotalAmount(): number{
    let total = 0;
    this.myBooking.forEach(e => {
      let arr = e?.split(":");
      if(arr != undefined && arr != null){
        let i = Number(arr[0]);
        let j = Number(arr[1]);
        total += this.ticketArr[i][j].price
      }
    });
    return total;
  }

}
