import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { login } from '../../interfaces/login.model';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { setServerSideErrors } from '../../validators/serverSideValidation';
import { ToastrService } from 'ngx-toastr';
import { toastConfig } from 'src/app/constants/toastConfig';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _api: ApiService,
    private _toastService: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: [, Validators.required],
      password: [, Validators.required],
    });
  }
  get userEmail() {
    return this.loginForm.controls['email'].value;
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
        this._toastService.success(
          `Welcome, ${this.userEmail}`,
          'Login successful',
          toastConfig
        );
      },
      (error) => {
        setServerSideErrors(error, this.loginForm);
      }
    );
  }
}