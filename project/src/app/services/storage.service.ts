import { Injectable } from '@angular/core';
import { user } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private name='token';
  constructor() { }
  set setToken(value:string){
    localStorage.setItem(this.name,btoa(encodeURIComponent(value)));
  }
  get userPermissionNumber(){
    const token=localStorage.getItem(this.name)
    return token!=null ? JSON.parse(decodeURIComponent(atob(token!= null ? token : ''))).roleId : undefined;
  }
  get userPermission(){
    const token=localStorage.getItem(this.name)
    return token!= null ? JSON.parse(decodeURIComponent(atob(token))) : undefined;
  }
  clear(){
    localStorage.removeItem(this.name);
  }
  check(user:user){
    return JSON.stringify(user)==JSON.stringify(this.userPermission) ? true : false;
  }
}
