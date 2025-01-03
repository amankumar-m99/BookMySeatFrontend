import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppData } from 'src/app/data/app.data';
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
        AppData.logIn(String(user.id), String(user.role));
        switch (user.role) {
          case "superadmin": this.router.navigate(["/dashboard/super-admin"]); break;
          case "theateradmin": this.router.navigate(["/dashboard/theater-admin"]); break;
          default: this.router.navigate(["/dashboard/user"]); break;
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
