import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { thread } from '../interfaces/thread.model';
import { threadAdd } from '../interfaces/threadAdd.model';
import { threadFilter } from '../interfaces/threadFilter.model';
import { archive } from '../interfaces/archive.model';
import { archiveChangeState } from '../interfaces/archiveChangeState.model';


@Injectable({
  providedIn: 'root'
})
export class ThreadService{
  private threadId!:number;
  private pageName:string='page';
  private pageSizeName:string='pageSize';
  private page:number=1;
  private pageSize:number=5
  //Refreshing data 
  threadsRefresher$= new BehaviorSubject<boolean>(true);
  threadRefresher$= new BehaviorSubject<boolean>(true);
  //Threads data as Observable which is refreshed by threadRefresher$
  threads$:Observable<thread[]>=this.threadsRefresher$.pipe(switchMap(_=>this.getThreads()));
  thread$:Observable<thread>=this.threadRefresher$.pipe(switchMap(_=>this.getThread(this.threadId)))
  //////For threads filter to avoid dulicated data requests
  threadFilter$=new BehaviorSubject<thread[]>([]); 
  queryParamsFitler=new HttpParams()
    .append(this.pageName,this.page)
    .append(this.pageSizeName,this.pageSize)
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
  getThreadAdmin():Observable<thread>{
    return this._http.get<thread>(`https://localhost:5000/api/threads/getThreadAdmin/${this.threadId}`);
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
    this.page=1;
    this.pageSize=5;
    this.queryParamsFitler=new HttpParams()
    .append(this.pageName,this.page)
    .append(this.pageSizeName,this.pageSize)
    if(resetFlag){
    }
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
  set setThreadId(value:number){
    this.threadId=value;
  }
  get getThreadId(){
    return this.threadId;
  }
  set setPage(value:number){
    this.page=value
    this.queryParamsFitler=this.queryParamsFitler.set(this.pageName,this.page)
    this.refreshThreads();
  }
  get getPage(){
    return this.page;
  }
  set setPageSize(value:number){
    this.pageSize=value
    this.queryParamsFitler=this.queryParamsFitler.set(this.pageSizeName,this.pageSize);
    this.refreshThreads();
  }
  get getPageSize(){
    return this.pageSize;
  }
}
