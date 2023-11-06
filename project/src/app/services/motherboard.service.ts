import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Pagination } from '../classes/pagination';
import { HttpClient } from '@angular/common/http';
import { Motherboard, MotherboardPost } from '../interfaces/motherboard.model';
import { MotherboardFilter } from '../interfaces/motherboardFilter.model';

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
  addMotherboard(body:MotherboardFilter){
    return this._http.post('https://localhost:5000/api/Hardware/addMotherboard',body)
  }
  editMotherboard(body:MotherboardPost,id:number){
    return this._http.put(`https://localhost:5000/api/Hardware/editMotherboard/${id}`,body);
  }
}
