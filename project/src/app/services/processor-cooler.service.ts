import { Injectable } from '@angular/core';
import { Pagination } from '../classes/pagination';
import { processorCooler } from '../interfaces/processorCooler.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessorCoolerService {
  pagination:Pagination=new Pagination();
  refreshProcessorCooler$=new BehaviorSubject<boolean>(true);
  processorCoolerFilter$=new BehaviorSubject<processorCooler[]>([]);
  processorCooler$:Observable<processorCooler[]>=this.refreshProcessorCooler$.pipe(switchMap(_=>this.getProcessorCooler()));
  constructor(private _http:HttpClient) { }
  getProcessorCooler():Observable<processorCooler[]>{
    return this._http.get<processorCooler[]>('https://localhost:5000/api/Hardware/getProcessorCooler',{params:this.pagination.getQueryParams});
  }
  refreshProcessorCooler(){
    this.refreshProcessorCooler$.next(true);
  }
}
