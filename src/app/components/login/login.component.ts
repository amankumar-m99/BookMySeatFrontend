import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppData } from 'src/app/data/app.data';
import { CookieData } from 'src/app/data/cookie.data';
import { LoginFormModel } from 'src/app/model/login-form.model';
import { LoginService } from 'src/app/services/login/login.service';

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
      next:(user)=>{
        CookieData.setCookie("userId", ""+user.id);
        let role = user.role;
        if(role == "superadmin"){
          this.router.navigate(["super-admin"]);
        }
        else if(role == "theateradmin"){
          this.router.navigate(["theater-admin"]);
        }
        else{
          this.router.navigate(["user"]);
        }
      },
      error: (error)=>{
        alert(error.status + " " + error.message);
      },
      complete: ()=>{}
    });
  }
}
