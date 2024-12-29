import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieData } from 'src/app/data/cookie.data';
import { LoginFormModel } from 'src/app/model/login-form.model';
import { LoginService } from 'src/app/services/login/login.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  toasts: { message: string; duration: number }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.toastService.toast$.subscribe(toast => {
      this.toasts.push(toast);
      setTimeout(() => {
        this.toasts.shift();
      }, toast.duration);
    });
  }

  submit(): void {
    let username: string = this.loginForm.get("username")?.value;
    let password: string = this.loginForm.get("password")?.value;
    let loginFormModel = new LoginFormModel(username, password);
    this.loginService.login(loginFormModel).subscribe({
      next: (user) => {
        CookieData.setCookie("userId", "" + user.id);
        let role = user.role;
        if (role == "superadmin") {
          this.router.navigate(["/dashboard/super-admin"]);
        }
        else if (role == "theateradmin") {
          this.router.navigate(["/dashboard/theater-admin"]);
        }
        else {
          this.router.navigate(["/dashboard/user"]);
        }
      },
      error: (error) => {
        alert(error.status + " " + error.message);
        this.showToast(error.message);
      },
      complete: () => { }
    });
  }

  showToast(msg: string) {
    this.toastService.showToast(msg, 4000);
  }
}
