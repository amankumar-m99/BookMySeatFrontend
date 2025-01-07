import { Component } from '@angular/core';
import { BookingResponseModel } from 'src/app/model/booking-response.model';
import { BookingService } from 'src/app/services/booking/booking.service';

@Component({
  selector: 'app-completed-bookings',
  templateUrl: './completed-bookings.component.html',
  styleUrls: ['./completed-bookings.component.css']
})

export class CompletedBookingsComponent {

  bookings?: BookingResponseModel[];

  constructor(
    private bookingService: BookingService
  ) {
    this.fetchData();
  }

  fetchData(): void {
    this.bookingService.getCompletedBookingByUserId(Number(localStorage.getItem("userId"))).subscribe({
      next: (res) => {
        this.bookings = res;
      },
      error: (err) => {
        alert("error: " + err.status + " " + err.message);
      },
      complete: () => { }
    });
  }
}
