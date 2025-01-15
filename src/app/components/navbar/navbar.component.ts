import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppData } from 'src/app/data/app.data';
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
    private userService: UserService,
    private toastr: ToastrService
  ) {
    if (AppData.isLoggedIn()) {
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
    this.userService.getUserById(Number(localStorage.getItem("userId"))).subscribe({
      next: (response) => this.user = response,
      error: (error) => this.toastr.error("Error", error.message)
    });
  }

  logout(): void {
    AppData.logout();
    this.router.navigate(['/']);
  }
}
