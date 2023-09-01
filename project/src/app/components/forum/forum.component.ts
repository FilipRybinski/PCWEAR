import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { thread } from 'src/app/interfaces/thread.model';
import { PopupService } from 'src/app/services/popup.service';
import { ThreadService } from 'src/app/services/thread.service';
import { ReactionService } from 'src/app/services/reaction.service';
import { reaction } from 'src/app/interfaces/reaction.model';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
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
  addReaction(threadId:number|undefined,value:number,thread:thread){
    let body:reaction={
      threadId:threadId,
      value:value
    }
    this._reactionService.addReaction(body).subscribe((res)=>{
      thread.currentLike=value;
    },(err)=>{
      console.log(err);
    })
  }
}
