import { Injectable } from '@angular/core';
import { Pagination } from '../classes/pagination';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { PowerSupply, PowerSupplyPost } from '../interfaces/powerSupply.model';
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
  addPowerSupply(body:PowerSupplyPost){
    return this._http.post('https://localhost:5000/api/Hardware/addPowerSupply',body)
  }
  editPowerSupply(body:PowerSupplyPost,id:number){
    return this._http.put(`https://localhost:5000/api/Hardware/editPowerSupply/${id}`,body);
  }
}
