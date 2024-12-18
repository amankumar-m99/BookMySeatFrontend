import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpFormModel } from '../model/sign-up-form.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

   constructor(private httpClient: HttpClient) { }
  
   signUp(model:SignUpFormModel):Observable<Object>{
      return this.httpClient.post<Object>("http://localhost:8080/user/signup", model);
    }
}
