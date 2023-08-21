import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../interfaces/loginForm.model';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { setServerSideErrors } from '../../validators/serverSideValidation';
import { ToastrService } from 'ngx-toastr';
import { toastConfig } from 'src/app/constants/toastConfig';
import { firstValueFrom } from 'rxjs';
import { bounceInOnEnterAnimation } from 'angular-animations';
import { User } from 'src/app/interfaces/user.models';


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
    var loginData: Login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    await firstValueFrom(this._accountService.postLogin(loginData)).then((res)=>{},
      (error) => {
        setServerSideErrors(error, this.loginForm);
      });
    await firstValueFrom(this._accountService.getCurrentUser()).then((res:User)=>{
      this._accountService.currentLoggedUser$.next(res);
      this._router.navigate(['home']);
        this._toastService.success(
          `Welcome, ${this.userEmail}`,
          'Login successful',
          toastConfig
        );
    })
    }
}
