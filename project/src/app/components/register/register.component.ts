import { Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { setServerSideErrors } from '../../validators/serverSideValidation';
import { Router } from '@angular/router';
import { userRegister } from 'src/app/interfaces/userRegister.model';
import { userLogin } from 'src/app/interfaces/userLogin.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _accountService: AccountService,
    private _toastService:ToastrService
  ) { }
  ngOnInit(): void {
    this.CreateForm();
  }
  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }
    var user: userRegister = {
      userName: this.registerForm.value.userName,
      userPassword: this.registerForm.value.userPassword,
      email: this.registerForm.value.email,
      personalData: {
        name:this.registerForm.value.name,
        surname:this.registerForm.value.surname,
        phoneNumber:this.registerForm.value.phoneNumber,
      },
    };
    console.log(user);
    this._accountService.postNewUser(user).subscribe(
      {
        next: (res)=>{
          let body:userLogin={
            email:this.registerForm.value.email,
            userPassword:this.registerForm.value.userPassword
          }
           this._accountService.postLogin(body).subscribe(
            {
              next:(res)=>{
                this._accountService.currentLoggedUser=res;
                this._toastService.success('','Successful login');
                 this._router.navigate(['home']);
              }
            });
        },
        error:(err)=>setServerSideErrors(err, this.registerForm)
      });
  }
  CreateForm() {
    this.registerForm = this._formBuilder.group({
      userName: ['',Validators.compose([Validators.required, Validators.maxLength(15)]),],
      userPassword: ['',Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'),]),,this.matchValidator('userPassword', true),],
      userPasswordConfirmed: ['',Validators.compose([Validators.required,this.matchValidator('userPassword'),]),],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      name: ['',Validators.compose([Validators.required, Validators.maxLength(15)]),],
      surname: ['',Validators.compose([Validators.required, Validators.maxLength(15)]),],
      phoneNumber: ['',Validators.compose([Validators.required, Validators.minLength(9)]),],
    });
  }
  matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent &&
        !!control.parent.value &&
        control.value === (control.parent?.controls as any)[matchTo].value
        ? null
        : { matching: true };
    };
  }
}
