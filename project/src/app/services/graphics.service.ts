import { Injectable } from '@angular/core';
import { Pagination } from '../classes/pagination';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Graphics } from '../interfaces/graphics.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GraphicsService {
  pagination:Pagination=new Pagination();
  refreshGraphics$=new BehaviorSubject<boolean>(true);
  graphicsFilter$=new BehaviorSubject<Graphics[]>([]);
  Graphics$:Observable<Graphics[]>=this.refreshGraphics$.pipe(switchMap(_=>this. getGraphics()));
  constructor(private _http:HttpClient) { }
  getGraphics():Observable<Graphics[]>{
    return this._http.get<Graphics[]>('https://localhost:5000/api/Hardware/getGraphics',{params:this.pagination.getQueryParams});
  }
  refreshGraphics(){
    this.refreshGraphics$.next(true);
  }
}
