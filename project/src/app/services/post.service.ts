import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { post } from '../interfaces/post.model';
import { postAdd } from '../interfaces/postAdd.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postRefresher$=new BehaviorSubject<boolean>(true);
  posts$:Observable<post[]>=this.postRefresher$.pipe(switchMap(_=>this.getPosts()))
  constructor(private _http:HttpClient)  { }
  addPost(threadId:number,body:postAdd){
    return this._http.post("https://localhost:5000/api/posts/addPost/"+threadId,body);
  }
  getPosts():Observable<post[]>{
    return this._http.get<post[]>("");
  }
}
