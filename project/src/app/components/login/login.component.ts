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
    var loginData: user = {
      email: this.loginForm.value.email,
      userPassword: this.loginForm.value.password,
    };
    await firstValueFrom(this._accountService.postLogin(loginData)).then((res)=>{},
      (error) => {
        console.log(error);
        setServerSideErrors(error, this.loginForm);
      });
    await firstValueFrom(this._accountService.getCurrentUser()).then((res:user)=>{
      this._accountService.currentLoggedUser=res;
      this._router.navigate(['home']);
        this._toastService.success(
          `Welcome, ${this.userEmail}`,
          'Login successful',
          toastConfig
        );
    })
    }
}
