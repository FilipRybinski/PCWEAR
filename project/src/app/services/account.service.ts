import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  currentLoggedUser!:user;
  constructor(private _hhtp: HttpClient) { }
  postNewUser(object: user) {
    return this._hhtp.post<user>('https://localhost:5000/api/account/register', object);
  }
  postLogin(object: user) {
    return this._hhtp.post<user>('https://localhost:5000/api/account/login', object);
  }
  getCurrentUser():Observable<user> {
    return this._hhtp.get<user>('https://localhost:5000/api/account/getCurrentUser');
  }
  logout():Observable<user>{
    return this._hhtp.get<user>('https://localhost:5000/api/account/logout');
  }
  get user(){
    return this.currentLoggedUser;
  }
}
