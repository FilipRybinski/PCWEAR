import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { post } from '../interfaces/post.model';
import { postAdd } from '../interfaces/postAdd.model';
import { postThread } from '../interfaces/postThread.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  threadId!:number;
  postRefresher$=new BehaviorSubject<boolean>(true);
  posts$:Observable<postThread[]>=this.postRefresher$.pipe(switchMap(_=>this.getPosts()))
  constructor(private _http:HttpClient)  { }
  addPost(threadId:number,body:postAdd){
    return this._http.post("https://localhost:5000/api/posts/addPost/"+threadId,body);
  }
  getPosts():Observable<postThread[]>{
    return this._http.get<postThread[]>(`https://localhost:5000/api/posts/getPosts/${this.threadId}`);
  }
  refreshPosts(){
    this.postRefresher$.next(true);
  }
}
