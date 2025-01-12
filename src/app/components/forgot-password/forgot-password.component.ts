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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private encryption: EncryptionService
  ) {
    let username: string = "";
    if (this.activatedRoute.snapshot.paramMap?.has("username")) {
      let obj = this.activatedRoute.snapshot.paramMap.get("username");
      if (obj != undefined && obj != null)
        username = this.encryption.decrypt(obj);
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
    this.isFormSubmissionInProcess = true;
  }

  showPassword() {
    if (this.type == "text") {
      this.type = "password";
    }
    else {
      this.type = "text";
    }
  }
}
