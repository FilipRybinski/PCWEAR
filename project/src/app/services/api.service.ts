import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry } from 'rxjs';
import { user } from '../interfaces/user.models';
import { login } from '../interfaces/login.model';

const url = 'http://localhost:5001/api/';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private hhtp: HttpClient) {}
  postNewUser(object: user) {
    return this.hhtp.post<user>(url + 'account/register', object);
  }
  postLogin(object: login) {
    return this.hhtp.post<login>(url + 'account/login', object);
  }
}
