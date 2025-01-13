import { Component, Input } from '@angular/core';
import { BookingResponseModel } from 'src/app/model/booking-response.model';

@Component({
  selector: 'app-upcoming-bookings-view',
  templateUrl: './upcoming-bookings-view.component.html',
  styleUrls: ['./upcoming-bookings-view.component.css']
})
export class UpcomingBookingsViewComponent {

  @Input("bookings")
  bookings?: BookingResponseModel[];
}
