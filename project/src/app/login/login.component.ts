import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { login } from '../shared/models/login.model';
import { ApiService } from '../shared/services/api.service';
import { Router } from '@angular/router';
import { setServerSideErrors } from '../shared/validators/serverSideValidation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  router = inject(Router);
  formBuilder=inject(FormBuilder);
  api=inject(ApiService);

  loginForm!: FormGroup;
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
        this.router.navigate(['home']);
      },
      error => {
        setServerSideErrors(error, this.loginForm);
      }
    )
  }

}
