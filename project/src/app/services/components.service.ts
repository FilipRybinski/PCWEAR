import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Part } from '../interfaces/part.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {
  private queryName:string="sortBy";
  private pageName:string='page';
  private pageSizeName:string='pageSize';
  private page:number=1;
  private pageSize:number=5
  queryParamsFitler=new HttpParams().append(this.pageName,this.page).append(this.pageSizeName,this.pageSize);
  refreshParts$=new BehaviorSubject<boolean>(true);
  Parts$:Observable<Part[]>=this.refreshParts$.pipe(switchMap(_=>this.getParts()))
  constructor(private _http:HttpClient) { }
  getParts():Observable<Part[]>{
    return this._http.get<Part[]>('https://localhost:5000/api/Hardware/allParts',{params:this.queryParamsFitler})
  }
  getTypes():Observable<string[]>{
    return this._http.get<string[]>('https://localhost:5000/api/Hardware/getType');
  }
  refreshParts(){
    this.refreshParts$.next(true);
  }
  setQueryParams(resetFlag:boolean,name?:string){
    this.page=1;
    this.queryParamsFitler=new HttpParams()
    .append(this.pageName,this.page)
    .append(this.pageSizeName,this.pageSize)
    if(resetFlag){
    }
    if(!resetFlag && name){
        this.queryParamsFitler.has(this.queryName) ? 
        this.queryParamsFitler=this.queryParamsFitler.set(this.queryName,name) :
        this.queryParamsFitler=this.queryParamsFitler.append(this.queryName,name);
      }
      this.refreshParts();
  }
  get getType(){
    return this.queryParamsFitler.get(this.queryName);
  }
  
  set setPage(value:number){
    this.page=value
    this.queryParamsFitler=this.queryParamsFitler.set(this.pageName,this.page)
    this.refreshParts();
  }
  get getPage(){
    return this.page;
  }
  set setPageSize(value:number){
    this.pageSize=value
    this.queryParamsFitler=this.queryParamsFitler.set(this.pageSizeName,this.pageSize);
    this.refreshParts();
  }
  get getPageSize(){
    return this.pageSize;
  }
}
