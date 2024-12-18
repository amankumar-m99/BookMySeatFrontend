import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginFormModel } from 'src/app/model/login-form.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm : FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private loginService:LoginService,
    private router:Router,
    private activatedroute:ActivatedRoute
  ){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit():void{
    let username:string = this.loginForm.get("username")?.value;
    let password:string = this.loginForm.get("password")?.value;
    let loginFormModel = new LoginFormModel(username, password);
    this.loginService.login(loginFormModel).subscribe({
      next:(response)=>{
        alert("Login Success. "+response.personalDetails.firstName);
      },
      error: (error)=>{
        alert(error.status + " " + error.message);
      },
      complete: ()=>{}
    });
  }
}
