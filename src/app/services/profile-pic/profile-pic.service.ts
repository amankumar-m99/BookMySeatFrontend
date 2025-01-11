import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppData } from 'src/app/data/app.data';

@Injectable({
  providedIn: 'root'
})
export class ProfilePicService {

  constructor(private httpClient: HttpClient) { }

  uploadProfilePic(userId: number, file: File): Observable<boolean> {
    const formData = new FormData();
    formData.append("profile-pic", file);
    return this.httpClient.post<boolean>(AppData.baseUrl + "/image/profile-pic/" + userId, formData);
  }

  getProfilePicSrc(userId: number): Observable<string> {
    return this.httpClient.get<string>(AppData.baseUrl + "/image/profile-pic/" + userId);
  }
}
