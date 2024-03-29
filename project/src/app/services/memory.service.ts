import { Injectable } from '@angular/core';
import { Memory, MemoryPost } from '../interfaces/memory.model';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../classes/pagination';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
  pagination:Pagination=new Pagination();
  refreshMemories$=new BehaviorSubject<boolean>(true);
  memoriesFilter$=new BehaviorSubject<Memory[]>([]);
  memories$:Observable<Memory[]>=this.refreshMemories$.pipe(switchMap(_=>this.getMemories()));
  constructor(private _http:HttpClient) { }
  getMemories():Observable<Memory[]>{
    return this._http.get<Memory[]>('https://localhost:5000/api/Hardware/getMemory',{params:this.pagination.getQueryParams});
  }
  refreshMemories(){
    this.refreshMemories$.next(true);
  }
  addMemory(body:MemoryPost){
    return this._http.post('https://localhost:5000/api/Hardware/addMemory',body);
  }
  editMemory(body:MemoryPost,id:number){
    return this._http.put(`https://localhost:5000/api/Hardware/editMemory/${id}`,body);
  }
}
