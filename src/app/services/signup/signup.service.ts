import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpFormModel } from '../../model/sign-up-form.model';
import { Observable } from 'rxjs';
import { AppData } from '../../data/app.data';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient) { }

  signUp(model: SignUpFormModel): Observable<Object> {
    return this.httpClient.post<Object>(AppData.baseUrl + "/user/signup", model);
  }
}
