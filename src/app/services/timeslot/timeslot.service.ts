import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppData } from '../../data/app.data';
import { Timeslot } from 'src/app/model/timeslot.model';
import { TimeslotRequestDTO } from 'src/app/model/timeslot-request-dto.model';

@Injectable({
  providedIn: 'root'
})

export class TimeslotService {

  constructor(private httpClient: HttpClient) { }

  getByTimeslotId(timeslotId: number): Observable<Timeslot> {
    return this.httpClient.get<Timeslot>(AppData.baseUrl + "/timeslot/" + timeslotId);
  }

  getByTheaterId(timeslotId: number): Observable<Timeslot> {
    return this.httpClient.get<Timeslot>(AppData.baseUrl + "/timeslot/theater" + timeslotId);
  }

  addTimeSlot(timeslotRequestDTO: TimeslotRequestDTO): Observable<Timeslot> {
    return this.httpClient.post<Timeslot>(AppData.baseUrl + "/timeslot", timeslotRequestDTO);
  }

}
