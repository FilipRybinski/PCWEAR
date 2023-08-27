import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { newThread } from '../interfaces/addThread.model';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  constructor(private _http:HttpClient) { }
  addThread(body:newThread){
    return this._http.post('https://localhost:5000/api/threads/addThread',body);
  }
}
