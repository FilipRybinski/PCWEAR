import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Countries } from '../../interfaces/country.model';
import { countries } from '../../interfaces/countryData.store';
import { AccountService } from 'src/app/services/account.service';
import { user } from '../../interfaces/user.models';
import { setServerSideErrors } from '../../validators/serverSideValidation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  countriesStore: Countries[] = countries;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _accountService: AccountService
  ) { }
  ngOnInit(): void {
    this.CreateForm();
  }
  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }
    var user: user = {
      userName: this.registerForm.value.userName,
      userPassword: this.registerForm.value.userPassword,
      userPasswordConfirmed: this.registerForm.value.userPasswordConfirmed,
      email: this.registerForm.value.email,
      postalDetails: this.registerForm.value.postalDetails,
      personalData: this.registerForm.value.personalData,
    };
    this._accountService.postNewUser(user).subscribe(
      (respone) => {
        this._router.navigate(['home']);
      },
      (error) => {
        setServerSideErrors(error, this.registerForm);
      }
    );
  }
  CreateForm() {
    this.registerForm = this._formBuilder.group({
      userName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(15)]),
      ],
      userPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ]),
        ,
        this.matchValidator('userPassword', true),
      ],
      userPasswordConfirmed: [
        '',
        Validators.compose([
          Validators.required,
          this.matchValidator('userPassword'),
        ]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      postalDetails: this._formBuilder.group({
        city: [
          '',
          Validators.compose([Validators.required, Validators.maxLength(15)]),
        ],
        country: ['', [Validators.required]],
        postalCode: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('^[0-9]{2,5}(:|-)?[0-9]{3,4}'),
          ]),
        ],
        street: [
          '',
          Validators.compose([Validators.required, Validators.maxLength(15)]),
        ],
      }),
      personalData: this._formBuilder.group({
        name: [
          '',
          Validators.compose([Validators.required, Validators.maxLength(15)]),
        ],
        surname: [
          '',
          Validators.compose([Validators.required, Validators.maxLength(15)]),
        ],
        phoneNumber: [
          '',
          Validators.compose([Validators.required, Validators.minLength(9)]),
        ],
      }),
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
