import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { thread } from '../interfaces/thread.model';
import { category } from '../interfaces/category.model';
import { threadAdd } from '../interfaces/threadAdd.model';
import { categoryAdd } from '../interfaces/categoryAdd.model';
import { threadFilter } from '../interfaces/threadFilter.model';


@Injectable({
  providedIn: 'root'
})
export class ThreadService{
  //Refreshing data 
  threadRefresher$= new BehaviorSubject<boolean>(true);
  //Threads data as Observable which is refreshed by threadRefresher$
  threads$:Observable<thread[]>=this.threadRefresher$.pipe(switchMap(_=>this.getThreads()));
  queryParamsFitler=new HttpParams();
  constructor(private _http:HttpClient)  { }
  addThread(body:threadAdd){
    return this._http.post('https://localhost:5000/api/threads/addThread',body);
  }
  getThreads():Observable<thread[]>{
    return this._http.get<thread[]>('https://localhost:5000/api/threads/filterThreads' ,{params:this.queryParamsFitler});

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
  refreshThreads(){
    this.threadRefresher$.next(true);
  }
  setQueryParams(resetFlag:boolean,filter?:threadFilter){
    if(resetFlag) this.queryParamsFitler=new HttpParams();
    if(!resetFlag && filter){
      Object.entries(filter).map(e=>{
        if(e[1]){
          this.queryParamsFitler.has(e[0]) ? 
          this.queryParamsFitler=this.queryParamsFitler.set(e[0],e[1]) :
          this.queryParamsFitler=this.queryParamsFitler.append(e[0],e[1]); 
        }
      })
    }
    this.refreshThreads();
  }
}
