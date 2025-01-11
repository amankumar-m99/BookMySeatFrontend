import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookingResponseModel } from 'src/app/model/booking-response.model';
import { BookingService } from 'src/app/services/booking/booking.service';

@Component({
  selector: 'app-upcoming-bookings',
  templateUrl: './upcoming-bookings.component.html',
  styleUrls: ['./upcoming-bookings.component.css']
})
export class UpcomingBookingsComponent {

  bookings?: BookingResponseModel[];

  constructor(
    private bookingService: BookingService,
    private toastr: ToastrService
  ) {
    this.fetchData();
  }

  fetchData(): void {
    this.bookingService.getUpcomingBookingByUserId(Number(localStorage.getItem("userId"))).subscribe({
      next: (res) => this.bookings = res,
      error: (error) => this.toastr.error("Error", error.message),
      complete: () => { }
    });
  }
}
