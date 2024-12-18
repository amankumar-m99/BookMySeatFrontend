import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private router:Router,
  ){}

  login():void{
    this.router.navigate(["login"]);
  }

  signup():void{
    this.router.navigate(["signup"]);
  }

  user():void{
    this.router.navigate(["user"]);
  }

  admin():void{
    this.router.navigate(["admin"]);
  }

}
