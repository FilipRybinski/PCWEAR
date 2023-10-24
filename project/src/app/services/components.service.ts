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
  queryParamas=new HttpParams().append(this.queryName,"processor").append("page",1).append("pageSize",5);
  refreshParts$=new BehaviorSubject<boolean>(true);
  Parts$:Observable<Part[]>=this.refreshParts$.pipe(switchMap(_=>this.getParts()))
  constructor(private _http:HttpClient) { }
  getParts():Observable<Part[]>{
    return this._http.get<Part[]>('https://localhost:5000/api/Hardware/allParts',{params:this.queryParamas})
  }
  getTypes():Observable<string[]>{
    return this._http.get<string[]>('https://localhost:5000/api/Hardware/getType');
  }
  refreshParts(){
    this.refreshParts$.next(true);
  }
  setQueryParams(name:string){
    this.queryParamas=new HttpParams()
      .append(this.queryName,name)
      .append("page",this.page)
      .append("pageSize",this.pageSize);
      this.refreshParts();
  }
  get getType(){
    return this.queryParamas.get(this.queryName);
  }
}
