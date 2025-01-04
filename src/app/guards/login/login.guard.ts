import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      switch (localStorage.getItem("role")) {
        case "superadmin": this.router.navigate(["/dashboard/super-admin"]); break;
        case "theateradmin": this.router.navigate(["/dashboard/theater-admin"]); break;
        default: this.router.navigate(["/dashboard/user"]); break;
      }
      return false;
    }
    return true;
  }

}
