import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../interfaces/user.model';
import { userRegister } from '../interfaces/userRegister.model';
import { userLogin } from '../interfaces/userLogin.model';
import { userEdit } from '../interfaces/userEdit.mode.';
import { userPermission } from '../interfaces/userPermission.model';
import { permission } from '../interfaces/permission.model';
import { ThreadStatistics } from '../interfaces/threadStatistics.model';

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
    return this._hhtp.post('https://localhost:5000/api/account/userAvatar',file,{reportProgress:true,observe:"events"})
  }
  editUser(body:userEdit):Observable<user>{
    return this._hhtp.post<user>('https://localhost:5000/api/account/userEdit',body);
  }
  getUsers():Observable<userPermission[]>{
    return this._hhtp.get<userPermission[]>('https://localhost:5000/api/account/getUsers');
  }
  updatePermissions(body:permission[]){
    return this._hhtp.post('https://localhost:5000/api/account/updatePermission',body);
  }
  confirmAccount(query:HttpParams){
    return this._hhtp.get('https://localhost:5000/api/account/confirmAccount',{params:query})
  }
  getThreadStatistics(body:number):Observable<ThreadStatistics[]>{
    return this._hhtp.get<ThreadStatistics[]>(`https://localhost:5000/api/account/getThreadStatistics/${body}`);
  }
  get user(){
    return this.currentLoggedUser;
  }
}
