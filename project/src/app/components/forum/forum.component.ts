import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { thread } from 'src/app/interfaces/thread.model';
import { PopupService } from 'src/app/services/popup.service';
import { ThreadService } from 'src/app/services/thread.service';
import { ReactionService } from 'src/app/services/reaction.service';
import { threadReaction } from 'src/app/interfaces/threadReaction.model';
import {tadaAnimation} from 'angular-animations';
import { threadLikes } from 'src/app/interfaces/threadLikes.model';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  animations:[tadaAnimation()]
})
export class ForumComponent implements OnInit{
  threads$!:Observable<thread[]>
  constructor(private _popupService:PopupService,private _threadService:ThreadService,private _reactionService:ReactionService){}
  ngOnInit(): void {
    this.threads$=this._threadService.getAvalibleThreads();
  }
  openPopup(name:string){
    this._popupService.openPopup(name,{});
  }
  addReaction(threadId:number,value:number,thread:thread,type:string){
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
      console.log(err);
    })
  }
}
