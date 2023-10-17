import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { thread } from '../interfaces/thread.model';
import { threadAdd } from '../interfaces/threadAdd.model';
import { threadFilter } from '../interfaces/threadFilter.model';


@Injectable({
  providedIn: 'root'
})
export class ThreadService{
  threadId!:number;
  //Refreshing data 
  threadsRefresher$= new BehaviorSubject<boolean>(true);
  threadRefresher$= new BehaviorSubject<boolean>(true);
  //Threads data as Observable which is refreshed by threadRefresher$
  threads$:Observable<thread[]>=this.threadsRefresher$.pipe(switchMap(_=>this.getThreads()));
  thread$:Observable<thread>=this.threadRefresher$.pipe(switchMap(_=>this.getThread(this.threadId)))
  //////For threads filter to avoid dulicated data requests
  threadFilter$=new BehaviorSubject<thread[]>([]); 
  queryParamsFitler=new HttpParams();
  constructor(private _http:HttpClient)  { }
  addThread(body:threadAdd){
    return this._http.post('https://localhost:5000/api/threads/addThread',body);
  }
  getThreads():Observable<thread[]>{
    return this._http.get<thread[]>('https://localhost:5000/api/threads/getThreads' ,{params:this.queryParamsFitler});
  }
  getThread(body:number):Observable<thread>{
    return this._http.get<thread>(`https://localhost:5000/api/threads/getThread/${body}`)
  }
  updateViews(body:number){
    return this._http.get(`https://localhost:5000/api/threads/updateViews/${body}`);
  }
  getNotAcceptedThreads():Observable<thread[]>{
    return this._http.get<thread[]>('https://localhost:5000/api/threads/getAllNotAcceptedThreads');
  }
  refreshThread(){
    this.threadRefresher$.next(true);
  }
  refreshThreads(){
    this.threadsRefresher$.next(true);
  }
  setToAccept(body:number[]){
    return this._http.post('https://localhost:5000/api/threads/acceptThreads',body);
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
