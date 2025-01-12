import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppData } from 'src/app/data/app.data';
import { LoginFormModel } from 'src/app/model/login-form.model';
import { LoginService } from 'src/app/services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { EncryptionService } from 'src/app/services/encryption/encryption.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  form: FormGroup;
  type = "password";
  isFormSubmissionInProcess = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private encryptionService: EncryptionService
  ) {
    let username: string = "";
    if (this.activatedRoute.snapshot.paramMap?.has("username")) {
      let obj = this.activatedRoute.snapshot.paramMap.get("username");
      if(obj != undefined && obj != null)
        username = this.encryptionService.decrypt(obj);
    }
    this.form = this.formBuilder.group({
      username: [username, Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required]
    });
  }

  submit(): void {
    let username: string = this.form.get("username")?.value;
    let password: string = this.form.get("password")?.value;
    let loginFormModel = new LoginFormModel(username, password);
    this.isFormSubmissionInProcess = true;
    this.loginService.login(loginFormModel).subscribe({
      next: (user) => {
        this.toastr.success('Login Success', '');
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
          this.toastr.error("Couldn't connect to server", "");
        }
        else {
          this.toastr.error('Error ' + error.status, error.message);
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
  tryy(): void {
    alert("Sucess");
  }
}
