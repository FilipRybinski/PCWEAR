import { Injectable } from '@angular/core';
import { Pagination } from '../classes/pagination';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { PowerSupply } from '../interfaces/powerSupply.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PowerSupplyService {
  pagination:Pagination=new Pagination();
  refreshPowerSupply$=new BehaviorSubject<boolean>(true);
  powerSupplyFilter$=new BehaviorSubject<PowerSupply[]>([]);
  powerSupply$:Observable<PowerSupply[]>=this.refreshPowerSupply$.pipe(switchMap(_=>this.getPowerSupply()));
  constructor(private _http:HttpClient) { }
  getPowerSupply():Observable<PowerSupply[]>{
    return this._http.get<PowerSupply[]>('https://localhost:5000/api/Hardware/getPowerSupply',{params:this.pagination.getQueryParams});
  }
  refreshPowerSupply(){
    this.refreshPowerSupply$.next(true);
  }
}
