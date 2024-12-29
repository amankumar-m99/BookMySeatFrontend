import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieData } from 'src/app/data/cookie.data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(router: Router) {
    // if(CookieData.hasCookie("role")){
    //   let role = CookieData.getCookie("role");
    //   if (role == "superadmin") {
    //     router.navigate(["/dashboard/super-admin"]);
    //   }
    //   else if (role == "theateradmin") {
    //     router.navigate(["/dashboard/theater-admin"]);
    //   }
    //   else {
    //     router.navigate(["/dashboard/user"]);
    //   }
    // }
    // else{
    //   router.navigate(["/home"]);
    // }
  }
}
