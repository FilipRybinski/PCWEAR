import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { thread } from 'src/app/interfaces/thread.model';
import { threadLikes } from 'src/app/interfaces/threadLikes.model';
import { threadReaction } from 'src/app/interfaces/threadReaction.model';
import { ReactionService } from 'src/app/services/reaction.service';
import {tadaAnimation,bounceInOnEnterAnimation} from 'angular-animations';

@Component({
  selector: 'app-thread-label',
  templateUrl: './thread-label.component.html',
  styleUrls: ['./thread-label.component.scss'],
  animations:[
    tadaAnimation(),
    bounceInOnEnterAnimation({delay:300}),
  ]
})
export class ThreadLabelComponent {
  @Input() link:boolean=false;
  @Input() thread!:thread;
  constructor( 
    private _reactionService:ReactionService,
    private _toastService:ToastrService
    ){}
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
}
