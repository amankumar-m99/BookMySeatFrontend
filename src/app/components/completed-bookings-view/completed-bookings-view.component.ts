import { Component, Input } from '@angular/core';
import { BookingResponseModel } from 'src/app/model/booking-response.model';

@Component({
  selector: 'app-completed-bookings-view',
  templateUrl: './completed-bookings-view.component.html',
  styleUrls: ['./completed-bookings-view.component.css']
})
export class CompletedBookingsViewComponent {

  @Input("bookings")
  bookings?: BookingResponseModel[];
}
