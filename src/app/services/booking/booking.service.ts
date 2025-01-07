import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginFormModel } from '../../model/login-form.model';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model';
import { AppData } from '../../data/app.data';
import { BookingRequest } from 'src/app/model/booking-request.model';
import { Booking } from 'src/app/model/booking.model';
import { BookingResponseModel } from 'src/app/model/booking-response.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient: HttpClient) { }

  addBooking(model: BookingRequest): Observable<Booking> {
    return this.httpClient.post<Booking>(AppData.baseUrl + "/booking", model);
  }
  
  getBookingByUserId(userId: number): Observable<BookingResponseModel[]> {
    return this.httpClient.get<BookingResponseModel[]>(AppData.baseUrl + "/booking/user/" + userId);
  }

  getUpcomingBookingByUserId(userId: number): Observable<BookingResponseModel[]> {
    return this.httpClient.get<BookingResponseModel[]>(AppData.baseUrl + "/booking/user/upcoming/" + userId);
  }

  getCompletedBookingByUserId(userId: number): Observable<BookingResponseModel[]> {
    return this.httpClient.get<BookingResponseModel[]>(AppData.baseUrl + "/booking/user/completed/" + userId);
  }

  getBookingByDate(date: Date): Observable<BookingResponseModel[]> {
    return this.httpClient.get<BookingResponseModel[]>(AppData.baseUrl + "/booking/date/" + date);
  }
}
