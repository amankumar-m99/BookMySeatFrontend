import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Theater } from '../../model/theater.model';
import { TheaterFormModel } from '../../model/theater-form.model';
import { Observable } from 'rxjs';
import { AppData } from '../../data/app.data';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {

  constructor(private httpClient: HttpClient) { }

  registerTheater(model: TheaterFormModel): Observable<Theater> {
    return this.httpClient.post<Theater>(AppData.baseUrl + "/theater", model);
  }

  getTheaterById(theaterId: number): Observable<Theater> {
    return this.httpClient.get<Theater>(AppData.baseUrl+"/theater/get/"+theaterId);
  }

  getAllTheatersOfOwner(ownerId:number): Observable<Theater[]>{
    return this.httpClient.get<Theater[]>(AppData.baseUrl+"/theater/owner/"+ownerId);
  }

  getAllTheaters(): Observable<Theater[]>{
    return this.httpClient.get<Theater[]>(AppData.baseUrl+"/theater/all");
  }

  addMovieToTheater(theaterId:number, movieId: number): Observable<Theater[]>{
    let data = { theaterId: theaterId, movieId: movieId };
    return this.httpClient.put<Theater[]>(AppData.baseUrl+"/theater/addMovie", data);
  }

  getTheaterCount(): Observable<number>{
    return this.httpClient.get<number>(AppData.baseUrl+"/theater/get/count");
  }
}