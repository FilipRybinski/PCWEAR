import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../interfaces/login.model';
import { user } from '../interfaces/user.models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private _hhtp: HttpClient) { }
  postNewUser(object: user) {
    return this._hhtp.post<user>('https://localhost:5000/api/account/register', object);
  }
  postLogin(object: login) {
    return this._hhtp.post<login>('https://localhost:5000/api/account/login', object);
  }
  getCurrentUser() {
    return this._hhtp.get('https://localhost:5000/api/account/getCurrentUser');
  }
}
