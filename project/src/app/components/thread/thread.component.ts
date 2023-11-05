import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { thread } from 'src/app/interfaces/thread.model';
import { PostService } from 'src/app/services/post.service';
import { ThreadService } from 'src/app/services/thread.service';
import {fadeInLeftOnEnterAnimation} from 'angular-animations';
import { PopupService } from 'src/app/services/popup.service';
import { postThread } from 'src/app/interfaces/postThread.model';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
  animations:[
    fadeInLeftOnEnterAnimation({delay:1000,duration:300}),
  ]
})
export class ThreadComponent implements OnInit{
  threadId!:number;
  temporary!:boolean;
  thread$!:Observable<thread[]>;
  posts$!:Observable<postThread[]>
  constructor(
    private _route:ActivatedRoute,
    private _threadService:ThreadService,
    private _toastService:ToastrService,
    private _postService:PostService,
    private _popupService:PopupService
    ){}
  ngOnInit(): void {
    this._route.queryParams.subscribe(params=>{
      this.threadId=params['id'];
      this._postService.threadId=params['id'];
      params['temporary'] ? this.temporary=true : this.temporary=false;
      if(!this.temporary){
        this._threadService.updateViews(this.threadId).subscribe({error:(err)=>{}});
      }
      this.thread$=this._threadService.getThread(this.threadId);
      this.posts$=this._postService.posts$.pipe(tap(e=>this._postService.postFilter$.next(e)));
    })
  }
  openPopup(name:string){
    this._popupService.openPopup(name,{});
  }
  resetFilter(){
    this._postService.pagination.setQueryParams(true);
    this._postService.refreshPosts();
  }
  pagination(value:number){
    this._postService.pagination.setPage=value;
    this._postService.refreshPosts();
  }
  changePageSize(pageSize:number){
    this._postService.pagination.setPageSize=pageSize
    this._postService.refreshPosts();
  }
  get page(){
    return this._postService.pagination.getPage;
  }
  get pageSize(){
    return this._postService.pagination.getPageSize;
  }
}
