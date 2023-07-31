import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { login } from '../../interfaces/login.model';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { setServerSideErrors } from '../../validators/serverSideValidation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  _router = inject(Router);
  _formBuilder = inject(FormBuilder);
  _api = inject(ApiService);

  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: [, Validators.required],
      password: [, Validators.required],
    });
  }
  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    var loginData: login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this._api.postLogin(loginData).subscribe(
      (response) => {
        this._router.navigate(['home']);
      },
      (error) => {
        setServerSideErrors(error, this.loginForm);
      }
    );
  }
}
