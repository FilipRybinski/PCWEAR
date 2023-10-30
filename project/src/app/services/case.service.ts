import { Injectable } from '@angular/core';
import { Pagination } from '../classes/pagination';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Case } from '../interfaces/case.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  pagination:Pagination=new Pagination();
  refreshProcessors$=new BehaviorSubject<boolean>(true);
  caseFilter$=new BehaviorSubject<Case[]>([]);
  cases$:Observable<Case[]>=this.refreshProcessors$.pipe(switchMap(_=>this.getCases()));
  constructor(private _http:HttpClient) { }
  getCases():Observable<Case[]>{
    return this._http.get<Case[]>('https://localhost:5000/api/Hardware/getCase',{params:this.pagination.getQueryParams});
  }
  refreshCases(){
    this.refreshProcessors$.next(true);
  }
}
