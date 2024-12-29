import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginFormModel } from '../../model/login-form.model';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model';
import { AppData } from '../../data/app.data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserById(userId: number): Observable<User> {
    return this.httpClient.get<User>(AppData.baseUrl + "/user/get/id/" + userId);
  }
}
