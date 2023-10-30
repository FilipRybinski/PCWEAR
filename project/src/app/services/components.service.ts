import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Part } from '../interfaces/part.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  constructor(private _http:HttpClient) { }
  
  getTop7():Observable<Part[]>{
    return this._http.get<Part[]>('https://localhost:5000/api/Hardware/getTop7');
  }
  manageFavourite(body:number):Observable<boolean>{
    return this._http.get<boolean>(`https://localhost:5000/api/Favourites/manageFavourite/${body}`)
  }
  getFavourites():Observable<Part[]>{
    return this._http.get<Part[]>('https://localhost:5000/api/Favourites/getFavourite');
  }
}
