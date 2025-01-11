import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SignUpFormModel } from 'src/app/model/sign-up-form.model';
import { SignupService } from 'src/app/services/signup/signup.service';

@Component({
  selector: 'app-register',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {

  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignupService,
    private toastr: ToastrService
  ) {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      isTheaterAdmin: [false, Validators.required]
    });
  }

  submit(): void {
    let email: string = this.signUpForm.get("email")?.value;
    let password: string = this.signUpForm.get("password")?.value;
    let confirmPassword: string = this.signUpForm.get("confirmPassword")?.value;
    let firstName: string = this.signUpForm.get("firstName")?.value;
    let middleName: string = this.signUpForm.get("middleName")?.value;
    let lastName: string = this.signUpForm.get("lastName")?.value;
    let phoneNumber: string = this.signUpForm.get("phoneNumber")?.value;
    let role: string = (this.signUpForm.get("isTheaterAdmin")?.value) ? "theateradmin" : "user";
    if (this.signUpForm.invalid) {
      this.toastr.error("Error", "Invalid form");
      return;
    }
    if (password != confirmPassword) {
      this.toastr.error("Error", "Password and confirm password not matching.");
      return;
    }
    let signUpFormModel: SignUpFormModel = new SignUpFormModel(email, password, firstName, middleName, lastName, phoneNumber, role);
    this.signUpService.signUp(signUpFormModel).subscribe({
      next: (response) => this.toastr.success("Success", "Sign up success."),
      error: (error) => this.toastr.error("Error", error.message),
      complete: () => { }
    });
  }
}
