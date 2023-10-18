import { Injectable } from '@angular/core';
import { user } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private name:string='token_';
  private dayExpire:number=1;
  constructor() { }
  set setToken(value:string){
    const date=new Date();
    date.setTime(date.getTime()+(this.dayExpire* 24 * 60 * 60 * 1000))
    document.cookie=`${this.name}=${btoa(encodeURIComponent(value))}; expires=${date.toUTCString()}; path=/`
  }
  get userPermissionNumber(){
    return this.getCookie().roleId ;
  }
  get userPermission(){
    return this.getCookie();
  }
  clear(){
    const date=new Date(Date.now()-(this.dayExpire* 24 * 60 * 60 * 1000));
    document.cookie=`${this.name}=; expires=${date.toUTCString()}; path=/`;
  }
  check(user:user):boolean{
    return this.getCookie()==user ? true : false;
  }
  private getCookie(){
    const cookies=document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(this.name + '=')) {
        return JSON.parse(decodeURIComponent(atob(cookie.substring(this.name.length + 1, cookie.length))));
      }
    }
    return undefined;
  }
}
