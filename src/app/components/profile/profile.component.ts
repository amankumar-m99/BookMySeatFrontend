import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppData } from 'src/app/data/app.data';
import { UserPersonalDetails } from 'src/app/model/user-personal-details.model';
import { UserPersonalDetailsService } from 'src/app/services/user/user-personal-details.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user?: UserPersonalDetails;

  constructor(
    private router: Router,
    private userService: UserPersonalDetailsService
  ) { }

  ngOnInit(): void {
    if (AppData.isLoggedIn()) {
      this.fetchData(Number(localStorage.getItem("userId")));
    }
  }

  fetchData(userId: number) {
    this.userService.getUserById(userId).subscribe({
      next: (response) => this.user = response,
      error: (error) => alert(error.message)
    });
  }
}
