import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { threadReaction } from '../interfaces/threadReaction.model';
import { Observable } from 'rxjs';
import { threadLikes } from '../interfaces/threadLikes.model';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  constructor(private _http:HttpClient) { }
  addReaction(body:threadReaction):Observable<threadLikes>{
    return this._http.post<threadLikes>('https://localhost:5000/api/threads/addReaction',body);
  }
}
