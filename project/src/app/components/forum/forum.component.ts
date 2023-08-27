import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Thread } from 'src/app/interfaces/thread.model';
import { PopupService } from 'src/app/services/popup.service';
import { ThreadService } from 'src/app/services/thread.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit{
  threads$!:Observable<Thread[]>
  constructor(private _popupService:PopupService,private _threadService:ThreadService){}
  ngOnInit(): void {
    this.threads$=this._threadService.getAvalibleThreads();
  }
  openPopup(name:string){
    this._popupService.openPopup(name,{});
  }
}
