import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieData } from 'src/app/data/cookie.data';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  user?: User;
  constructor(
    private router: Router,
    private userService: UserService
  ) {
    if (CookieData.hasCookie("userId")) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
  }

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      return;
    }
    this.userService.getUserById(Number(CookieData.getCookie("userId"))).subscribe({
      next: (response) => { this.user = response },
      error: (error) => { alert("Error in fetching user data."); }
    });
  }

  profile(): void{
    this.router.navigate(['/dashboard/profile']);
  }

  logout(): void {
    CookieData.deleteCookie("userId");
    this.router.navigate(['/']);
  }
}
