import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reaction } from '../interfaces/reaction.model';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  constructor(private _http:HttpClient) { }
  addReaction(body:reaction){
    return this._http.post('https://localhost:5000/api/threads/addReaction',body);
  }
}
