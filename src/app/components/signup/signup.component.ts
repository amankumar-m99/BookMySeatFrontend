import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpFormModel } from 'src/app/model/sign-up-form.model';
import { LoginService } from 'src/app/services/login.service';
import { SignupService } from 'src/app/services/signup.service';

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
    private router: Router,
    private activatedroute: ActivatedRoute
  ) {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required]
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
    if(this.signUpForm.invalid){
      alert("Invalid form!");
      return;
    }
    if (password != confirmPassword) {
      alert("Password and confirm password not matching!");
      return;
    }
    let signUpFormModel: SignUpFormModel = new SignUpFormModel(email, password, firstName, middleName, lastName, phoneNumber);
    this.signUpService.signUp(signUpFormModel).subscribe({
      next: (response) => {
        alert("Sign up success.")
      },
      error: (error) => {
        alert(error.status + " " + error.message);
      },
      complete: () => { }
    });
  }
}
