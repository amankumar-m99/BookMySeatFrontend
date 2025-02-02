import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppData } from 'src/app/data/app.data';
import { LoginFormModel } from 'src/app/model/login-form.model';
import { LoginService } from 'src/app/services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { EncryptionService } from 'src/app/services/encryption/encryption.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  type = "password";
  isFormSubmissionInProcess = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private encryption: EncryptionService

  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    let username: string = this.loginForm.get("username")?.value;
    let password: string = this.loginForm.get("password")?.value;
    let loginFormModel = new LoginFormModel(username, password);
    this.isFormSubmissionInProcess = true;
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
        this.isFormSubmissionInProcess = false;
        if (error.status == 0) {
          this.toastr.error("Couldn't connect to server");
        }
        else {
          this.toastr.error(error.message, 'Error ' + error.status);
        }
      },
      complete: () => this.isFormSubmissionInProcess = false
    });
  }

  showPassword() {
    if (this.type == "text") {
      this.type = "password";
    }
    else {
      this.type = "text";
    }
  }

  get encryptedUsername(): string {
    return this.encryption.encrypt(this.username);
  }

  get username() {
    return this.loginForm.get("username")?.value;
  }
}
