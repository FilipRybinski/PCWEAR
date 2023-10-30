import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Processor } from '../interfaces/processor.model';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../classes/pagination';

@Injectable({
  providedIn: 'root'
})
export class ProcessorsService {
  pagination:Pagination=new Pagination();
  refreshProcessors$=new BehaviorSubject<boolean>(true);
  processorsFilter$=new BehaviorSubject<Processor[]>([]);
  processors$:Observable<Processor[]>=this.refreshProcessors$.pipe(switchMap(_=>this.getProcessors()));
  constructor(private _http:HttpClient) { }
  getProcessors():Observable<Processor[]>{
    return this._http.get<Processor[]>('https://localhost:5000/api/Hardware/getProcessor',{params:this.pagination.getQueryParams});
  }
  refreshProcessors(){
    this.refreshProcessors$.next(true);
  }
}
