import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Pagination } from '../classes/pagination';
import { HttpClient } from '@angular/common/http';
import { Motherboard } from '../interfaces/motherboard.model';

@Injectable({
  providedIn: 'root'
})
export class MotherboardService {
  pagination:Pagination=new Pagination();
  refreshMotherboards$=new BehaviorSubject<boolean>(true);
  motherboardFilter$=new BehaviorSubject<Motherboard[]>([]);
  motherboards$:Observable<Motherboard[]>=this.refreshMotherboards$.pipe(switchMap(_=>this.getMotherboards()))
  constructor(private _http:HttpClient) { }
  getMotherboards():Observable<Motherboard[]>{
    return this._http.get<Motherboard[]>('https://localhost:5000/api/Hardware/getMotherboard',{params:this.pagination.getQueryParams})
  }
  refreshMotherboards(){
    this.refreshMotherboards$.next(true);
  }
}
