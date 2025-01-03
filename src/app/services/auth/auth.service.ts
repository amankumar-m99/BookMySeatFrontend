import { Injectable } from '@angular/core';
import { AppData } from 'src/app/data/app.data';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    return AppData.isLoggedIn();
  }

  login(userId: string, role: string): void {
    AppData.logIn(userId, role);
  }

  logout(): void {
    AppData.logout();
  }
}
