import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recommended } from '../interfaces/recommended.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendedService {

  constructor(private _http:HttpClient) { }
  addRecommended(body:(number | undefined)[]){
    return this._http.post(`https://localhost:5000/api/Recommended/addRecommended`,body);
  }
  getRecommended():Observable<Recommended[]>{
    return this._http.get<Recommended[]>('https://localhost:5000/api/Recommended/getRecommended');
  }
}
