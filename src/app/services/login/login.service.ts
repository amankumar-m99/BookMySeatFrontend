import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginFormModel } from '../../model/login-form.model';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model';
import { AppData } from '../../data/app.data';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(loginFormModel: LoginFormModel): Observable<User> {
    return this.httpClient.post<User>(AppData.baseUrl + "/user/login", loginFormModel);
  }
}
