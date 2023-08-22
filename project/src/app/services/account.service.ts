import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interfaces/loginForm.model';
import { User } from '../interfaces/user.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  currentLoggedUser!:User;
  constructor(private _hhtp: HttpClient) { }
  postNewUser(object: User) {
    return this._hhtp.post<User>('https://localhost:5000/api/account/register', object);
  }
  postLogin(object: Login) {
    return this._hhtp.post<Login>('https://localhost:5000/api/account/login', object);
  }
  getCurrentUser():Observable<User> {
    return this._hhtp.get<User>('https://localhost:5000/api/account/getCurrentUser');
  }
  logout():Observable<User>{
    return this._hhtp.get<User>('https://localhost:5000/api/account/logout');
  }
  get user(){
    return this.currentLoggedUser;
  }
}
