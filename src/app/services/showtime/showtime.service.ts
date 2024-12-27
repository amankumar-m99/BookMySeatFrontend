import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model';
import { AppData } from '../../data/app.data';
import { ShowtimeForm } from 'src/app/model/showtime-form.model';
import { Showtime } from 'src/app/model/showtime.model';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {

  constructor(private httpClient: HttpClient) { }

  addShowtime(formModel: ShowtimeForm[]): Observable<Showtime> {
    return this.httpClient.post<Showtime>(AppData.baseUrl + "/showtime", formModel);
  }

}
