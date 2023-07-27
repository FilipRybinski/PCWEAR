import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { login } from '../shared/models/login.model';
import { ApiService } from '../shared/services/api.service';
import { Subscription } from 'rxjs';
import { setServerSideErrors } from '../shared/validators/serverSideValidation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [, Validators.required],
      password: [, Validators.required]
    })
  }
  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    var loginData: login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.api.postLogin(loginData).subscribe(
      response => {
        localStorage.setItem('token', response.toString());
      },
      error => {
        setServerSideErrors(error, this.loginForm);
      }
    )
  }

}
