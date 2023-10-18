import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { thread } from 'src/app/interfaces/thread.model';
import { PostService } from 'src/app/services/post.service';
import { ThreadService } from 'src/app/services/thread.service';
import {fadeInLeftOnEnterAnimation} from 'angular-animations';
import { PopupService } from 'src/app/services/popup.service';

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
  thread$!:Observable<thread>;
  constructor(
    private _route:ActivatedRoute,
    private _threadService:ThreadService,
    private _toastService:ToastrService,
    private _postService:PostService,
    private _popupService:PopupService){}
  ngOnInit(): void {
    this._route.queryParams.subscribe(params=>{
      this.threadId=params['id'];
      this._threadService.setThreadId=params['id'];
      params['temporary'] ? this.temporary=true : this.temporary=false;
      if(!this.temporary){
        this._threadService.updateViews(this.threadId).subscribe({error:(err)=>{}});
        this.thread$=this._threadService.thread$;
      }else{
        this.thread$=this._threadService.getThreadAdmin();
      }
    })
  }
  openPopup(name:string){
    this._popupService.openPopup(name,{});
  }
}
