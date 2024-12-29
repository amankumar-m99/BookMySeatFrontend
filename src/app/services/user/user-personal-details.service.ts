import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginFormModel } from '../../model/login-form.model';
import { Observable } from 'rxjs';
import { AppData } from '../../data/app.data';
import { UserPersonalDetails } from 'src/app/model/user-personal-details.model';

@Injectable({
  providedIn: 'root'
})
export class UserPersonalDetailsService {

  constructor(private httpClient: HttpClient) { }

  getUserById(userId: number): Observable<UserPersonalDetails> {
    return this.httpClient.get<UserPersonalDetails>(AppData.baseUrl + "/user-personal-details/get/" + userId);
  }
}
