import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { thread } from 'src/app/interfaces/thread.model';
import { PopupService } from 'src/app/services/popup.service';
import { ThreadService } from 'src/app/services/thread.service';
import { ReactionService } from 'src/app/services/reaction.service';
import { threadReaction } from 'src/app/interfaces/threadReaction.model';
import {tadaAnimation} from 'angular-animations';
import { threadLikes } from 'src/app/interfaces/threadLikes.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  animations:[tadaAnimation()]
})
export class ForumComponent implements OnInit,OnDestroy{
  threads!:thread[];
  subsciption=new Subscription();
  constructor(private _popupService:PopupService,private _threadService:ThreadService,private _reactionService:ReactionService,private _toastService:ToastrService){}
  ngOnInit(): void {
    this.subsciption.add(
    this._threadService.threads$.subscribe(
      {next: (res)=>{
        this.threads=res;
        this._threadService.threadFilter$.next(res);
      },
      error: (err)=>{
        this._toastService.error(err.error.Message,err.error.Code);
      }
    }));
  }
  openPopup(name:string){
    this._popupService.openPopup(name,{});
  }
  addReaction(threadId:number,value:number,thread:thread){
    if(value==thread.currentLike)value=0;
    let body:threadReaction={
      threadId:threadId,
      value:value
    }
    this._reactionService.addReaction(body).subscribe((res:threadLikes)=>{
      thread.currentLike=value;
      thread.likes=res.likes;
      thread.dislikes=res.dislikes;
    },(err)=>{
      this._toastService.warning('<a href="/login">Click here</a> to get access to this function',err.error.Message,{"enableHtml":true});
    })
  }
  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }
}
