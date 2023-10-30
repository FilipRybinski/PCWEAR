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
    this._threadService.pagination.setQueryParams(true);
    this._threadService.refreshThreads();
  }
  pagination(value:number){
    this._threadService.pagination.setPage=value;
    this._threadService.refreshThreads();
  }
  changePageSize(pageSize:number){
    this._threadService.pagination.setPageSize=pageSize
    this._threadService.refreshThreads();
  }
  get page(){
    return this._threadService.pagination.getPage;
  }
  get pageSize(){
    return this._threadService.pagination.getPageSize;
  }
}
