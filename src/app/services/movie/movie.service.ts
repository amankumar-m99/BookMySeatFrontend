import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppData } from 'src/app/data/app.data';
import { Movie } from 'src/app/model/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  getAllMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(AppData.baseUrl + "/movie/all");
  }

  getMovieById(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(AppData.baseUrl + "/movie/get/" + id);
  }
}
