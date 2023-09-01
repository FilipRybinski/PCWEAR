import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { setServerSideErrors } from '../../validators/serverSideValidation';
import { ToastrService } from 'ngx-toastr';
import { toastConfig } from 'src/app/constants/toastConfig';
import { firstValueFrom } from 'rxjs';
import { bounceInOnEnterAnimation } from 'angular-animations';
import { user } from 'src/app/interfaces/user.model';
import { userLogin } from 'src/app/interfaces/userLogin.model';


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
    await firstValueFrom(this._accountService.postLogin(loginData)).then((res)=>{
      firstValueFrom(this._accountService.getCurrentUser()).then((res:user)=>{
      this._accountService.currentLoggedUser=res;
      this._router.navigate(['home']);
        this._toastService.success(
          `Welcome, ${this.userEmail}`,
          'Login successful',
          toastConfig
        );
      })
    },
      (error) => {
        console.log(error);
        this._toastService.error('',error.error,toastConfig)
        setServerSideErrors(error, this.loginForm);
      });
    
    }
}
