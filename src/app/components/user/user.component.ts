import { Component } from '@angular/core';
import { CookieData } from 'src/app/data/cookie.data';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  currentTabName = "Upcoming Bookings";

  constructor(){
    if(CookieData.hasCookie("userCurrentTabName")){
      this.currentTabName=CookieData.getCookie("userCurrentTabName");
    }
    else{
      CookieData.setCookie("userCurrentTabName", this.currentTabName);
    }
  }
  
  tabClick(tabName: string): void {
    this.currentTabName = tabName;
    CookieData.setCookie("userCurrentTabName", this.currentTabName);
  }
}
