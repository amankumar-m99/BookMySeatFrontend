import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    private bookingService: BookingService,
    private toastr: ToastrService
  ) {
    this.fetchData();
  }

  fetchData(): void {
    this.bookingService.getBookingByUserId(Number(localStorage.getItem("userId"))).subscribe({
      next: (res) => {
        this.bookings = res;
      },
      error: (error) => {
        this.toastr.error('Error', error.message);
      },
      complete: () => { }
    });
  }
}
