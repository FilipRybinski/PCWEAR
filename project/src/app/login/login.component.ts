import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { login } from '../shared/models/login.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  loginFailed!:string;
  constructor(private formBuilder:FormBuilder,private api:ApiService){}
  ngOnInit(): void {
   this.loginForm=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
   })
  }
  login(){
    var loginData:login={
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    }
    this.api.postLoginUser(loginData).subscribe(
      response=>{
        localStorage.setItem('token',response.toString());
      },
      error=>{
        this.loginFailed=error.error;
      }
    )
  }
}
