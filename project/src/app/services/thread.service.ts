import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { thread } from '../interfaces/thread.model';
import { category } from '../interfaces/category.model';
import { threadAdd } from '../interfaces/threadAdd.model';
import { categoryAdd } from '../interfaces/categoryAdd.model';


@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  constructor(private _http:HttpClient) { }
  addThread(body:threadAdd){
    return this._http.post('https://localhost:5000/api/threads/addThread',body);
  }
  getAvalibleThreads():Observable<thread[]>{
    return this._http.get<thread[]>('https://localhost:5000/api/threads/getThreads');
  }
  addCategory(body:categoryAdd){
    return this._http.post('https://localhost:5000/api/category/postCategory',body);
  }
  getCategories():Observable<category[]>{
    return this._http.get<category[]>('https://localhost:5000/api/category/getCategory');
  }
  updateViews(body:number){
    return this._http.get('https://localhost:5000/api/threads/updateViews/'+body);
  }
}
