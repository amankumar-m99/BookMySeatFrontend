import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppData } from '../../data/app.data';
import { ShowtimeForm } from 'src/app/model/showtime-form.model';
import { Showtime } from 'src/app/model/showtime.model';
import { MovieBookingShowDTO } from 'src/app/model/movie-booking-show.dto';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {

  constructor(private httpClient: HttpClient) { }

  addShowtime(formModel: ShowtimeForm[]): Observable<Showtime[]> {
    return this.httpClient.post<Showtime[]>(AppData.baseUrl + "/showtime", formModel);
  }
  
  findShowtimeByMovieId(movieId: number, date: Date): Observable<MovieBookingShowDTO[]>{

    return this.httpClient.get<MovieBookingShowDTO[]>(AppData.baseUrl + "/showtime/movie/" + movieId + "/" + date);
  }

}
