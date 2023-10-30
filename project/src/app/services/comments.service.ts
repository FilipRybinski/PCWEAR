import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Part } from '../interfaces/part.model';
import { Assessment } from '../interfaces/assessment.model';
import { Comment } from '../interfaces/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private _http:HttpClient) { }
  addAssessment(body:Assessment){
    return this._http.post('https://localhost:5000/api/Assessment/addAssessment',body);
  }
  getAssessments(body:number):Observable<Comment[]>{
    return this._http.get<Comment[]>(`https://localhost:5000/api/Assessment/getAssessments/${body}`);
  }
  checkAssessment(body:number):Observable<Assessment>{
    return this._http.get<Assessment>(`https://localhost:5000/api/Assessment/checkAssessment/${body}`)
  }
  editAssessment(body:Assessment){
    return this._http.put('https://localhost:5000/api/Assessment/modifyAssessment',body);
  }
}
