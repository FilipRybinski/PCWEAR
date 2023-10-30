import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Part } from '../interfaces/part.model';
import { Assessment } from '../interfaces/assessment.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {
  private queryName:string="sortBy";
  private pageName:string='page';
  private pageSizeName:string='pageSize';
  private page:number=1;
  private pageSize:number=5
  currentParts$=new BehaviorSubject<Part[]>([]);
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
  addAssessment(body:Assessment){
    return this._http.post('https://localhost:5000/api/Hardware/addAssessment',body);
  }
  refreshParts(){
    this.refreshParts$.next(true);
  }
}
