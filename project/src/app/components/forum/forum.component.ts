import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { thread } from 'src/app/interfaces/thread.model';
import { PopupService } from 'src/app/services/popup.service';
import { ThreadService } from 'src/app/services/thread.service';
import { ReactionService } from 'src/app/services/reaction.service';
import {tadaAnimation} from 'angular-animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  animations:[tadaAnimation()]
})
export class ForumComponent implements OnInit{
  threads$!:Observable<thread[]>;
  fetched:boolean=false;
  constructor(private _popupService:PopupService,private _threadService:ThreadService,private _reactionService:ReactionService,private _toastService:ToastrService){}
  ngOnInit(): void {
    this.threads$=this._threadService.threads$.pipe(tap(e=>this._threadService.threadFilter$.next(e)))
  }
  openPopup(name:string){
    this._popupService.openPopup(name,{});
  }
  resetFilter(){
    this._threadService.setQueryParams(true);
  }
  next(){
    let value=this._threadService.getPage;
    this._threadService.setPage=++value;
  }
  previous(){
    let value=this._threadService.getPage;
    this._threadService.setPage=--value;
  }
  get page(){
    return this._threadService.getPage;
  }
  get pageSize(){
    return this._threadService.getPageSize;
  }
}
