import { Component, Input } from '@angular/core';
import { BookingResponseModel } from 'src/app/model/booking-response.model';

@Component({
  selector: 'app-booking-view',
  templateUrl: './booking-view.component.html',
  styleUrls: ['./booking-view.component.css']
})
export class BookingViewComponent {

  @Input("bookings")
  bookings?: BookingResponseModel[];
}
