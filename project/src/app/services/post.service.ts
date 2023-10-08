import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { post } from '../interfaces/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postRefresher$=new BehaviorSubject<boolean>(true);
  posts$:Observable<post[]>=this.postRefresher$.pipe(switchMap(_=>this.getPosts()))
  constructor(private _http:HttpClient)  { }
  addPost(threadId:number){
    let tmp={
      title: "string",
      body: "string"
    }
    return this._http.post("https://localhost:5000/api/posts/addPost/"+threadId,tmp);
  }
  getPosts():Observable<post[]>{
    return this._http.get<post[]>("");
  }
}
