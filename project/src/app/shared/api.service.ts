import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { user} from './models/user.models'

const url="http://localhost:5001/api/"
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private hhtp:HttpClient) { }
  postNewUser(object:user){
    return this.hhtp.post<user>(url+"account/register",object).pipe(map((res)=>{
      return res;
    }))
  }

}
