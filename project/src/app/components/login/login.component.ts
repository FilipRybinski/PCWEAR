import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { setServerSideErrors } from '../../validators/serverSideValidation';
import { ToastrService } from 'ngx-toastr';
import { bounceInOnEnterAnimation } from 'angular-animations';
import { userLogin } from 'src/app/interfaces/userLogin.model';
import { CookieService } from 'src/app/services/cookie.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations:[bounceInOnEnterAnimation()]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _accountService: AccountService,
    private _toastService: ToastrService,
    private _storageService:CookieService
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
  async onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    var loginData: userLogin = {
      email: this.loginForm.value.email,
      userPassword: this.loginForm.value.password,
    };
    this._accountService.postLogin(loginData).subscribe(
      {
        next: (res)=>{
          this._accountService.currentLoggedUser=res;
          this._storageService.setToken=JSON.stringify(res);
          this._router.navigate(['home']);
          this._toastService.success(`Welcome, ${this.userEmail}`,'Login successful',);
        },
        error: (err)=>{
          setServerSideErrors(err, this.loginForm) ? setServerSideErrors(err, this.loginForm) : this._toastService.error('', err.error.Message);
        }
      })
    }
}
