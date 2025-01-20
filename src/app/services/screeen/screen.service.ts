import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppData } from '../../data/app.data';
import { Screen } from '../../model/screen.model';
import { AddScreenModel } from 'src/app/model/screens/add-screen.model';

@Injectable({
  providedIn: 'root'
})

export class ScreenService {

  constructor(private httpClient: HttpClient) { }

  addScreen(model: AddScreenModel): Observable<Screen> {
    return this.httpClient.post<Screen>(AppData.baseUrl + "/screen", model);
  }
}
