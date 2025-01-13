import { Component, Input } from '@angular/core';
import { BookingResponseModel } from 'src/app/model/booking-response.model';

@Component({
  selector: 'app-all-bookings-view',
  templateUrl: './all-bookings-view.component.html',
  styleUrls: ['./all-bookings-view.component.css']
})
export class AllBookingsViewComponent {

  @Input("bookings")
    bookings?: BookingResponseModel[];
}
