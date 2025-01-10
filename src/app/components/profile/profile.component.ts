import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  profilePicSrc = "../../../assets/logo.png";

  @ViewChild('fileInputTag') fileInputTag!:ElementRef;
  @ViewChild('profilePic') profilePic!:ElementRef;

  constructor(
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

  showModal(){
    alert("Profile clicxked");
  }

  fileChangeEvent(event: any): void {
  }

  openFileChooser(){
    this.fileInputTag.nativeElement.click();
  }

}
