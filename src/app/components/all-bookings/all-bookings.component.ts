import { Component } from '@angular/core';
import { BookingResponseModel } from 'src/app/model/booking-response.model';
import { BookingService } from 'src/app/services/booking/booking.service';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css']
})
export class AllBookingsComponent {

  bookings?: BookingResponseModel[];

  constructor(
    private bookingService: BookingService
  ) {
    this.fetchData();
  }

  fetchData(): void {
    this.bookingService.getBookingByUserId(Number(localStorage.getItem("userId"))).subscribe({
      next: (res) => {
        this.bookings = res;
      },
      error: (err) => {
        alert("error: " + err.status + " " + err.message);
      },
      complete: ()=> {}
    });
  }
}
