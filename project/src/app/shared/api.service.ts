import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry } from 'rxjs';
import { user} from './models/user.models'
import { login } from './models/login.model';

const url="http://localhost:5001/api/"
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private hhtp:HttpClient) { }
  postNewUser(object:user){
    return this.hhtp.post<user>(url+"account/register",object);
  }
  postLoginUser(object:login){
    return this.hhtp.post<login>(url+"account/login",object);
  }

}
