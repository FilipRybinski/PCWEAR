import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../interfaces/user.model';
import { userRegister } from '../interfaces/userRegister.model';
import { userLogin } from '../interfaces/userLogin.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  currentLoggedUser!:user;
  constructor(private _hhtp: HttpClient) { }
  postNewUser(object: userRegister) {
    return this._hhtp.post<user>('https://localhost:5000/api/account/register', object);
  }
  postLogin(object: userLogin):Observable<user> {
    return this._hhtp.post<user>('https://localhost:5000/api/account/login', object);
  }
  getCurrentUser():Observable<user> {
    return this._hhtp.get<user>('https://localhost:5000/api/account/getCurrentUser');
  }
  logout():Observable<user>{
    return this._hhtp.get<user>('https://localhost:5000/api/account/logout');
  }
  setUserIcon(file:FormData){
    return this._hhtp.post('https://localhost:5000/api/account/userIcon',file,)
  }
  get user(){
    return this.currentLoggedUser;
  }
}
