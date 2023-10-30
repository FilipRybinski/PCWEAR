import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { thread } from '../interfaces/thread.model';
import { threadAdd } from '../interfaces/threadAdd.model';
import { threadFilter } from '../interfaces/threadFilter.model';
import { archive } from '../interfaces/archive.model';
import { archiveChangeState } from '../interfaces/archiveChangeState.model';
import { Pagination } from '../classes/pagination';


@Injectable({
  providedIn: 'root'
})
export class ThreadService{
  pagination:Pagination=new Pagination();
  //Refreshing data 
  threadsRefresher$= new BehaviorSubject<boolean>(true);
  //Threads data as Observable which is refreshed by threadRefresher$
  threads$:Observable<thread[]>=this.threadsRefresher$.pipe(switchMap(_=>this.getThreads()));
  //////For threads filter to avoid dulicated data requests
  threadFilter$=new BehaviorSubject<thread[]>([]); 
  constructor(private _http:HttpClient)  { }
  addThread(body:threadAdd){
    return this._http.post('https://localhost:5000/api/threads/addThread',body);
  }
  getThreads():Observable<thread[]>{
    return this._http.get<thread[]>('https://localhost:5000/api/threads/getThreads' ,{params:this.pagination.getQueryParams});
  }
  getThread(body:number):Observable<thread[]>{
    return this._http.get<thread[]>(`https://localhost:5000/api/threads/getThread/${body}`)
  }
  updateViews(body:number){
    return this._http.get(`https://localhost:5000/api/threads/updateViews/${body}`);
  }
  getNotAcceptedThreads():Observable<thread[]>{
    return this._http.get<thread[]>('https://localhost:5000/api/threads/getAllNotAcceptedThreads');
  }
  getArchives():Observable<archive[]>{
    return this._http.get<archive[]>('https://localhost:5000/api/threads/getArchive');
  }
  changeArchive(body:archiveChangeState[]){
    return this._http.post('https://localhost:5000/api/threads/changeStateArchive',body);
  }
  refreshThreads(){
    this.threadsRefresher$.next(true);
  }
  setToAccept(body:number[]){
    return this._http.post('https://localhost:5000/api/threads/acceptThreads',body);
  }
}
