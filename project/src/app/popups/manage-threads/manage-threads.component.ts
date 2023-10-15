import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, switchMap } from 'rxjs';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { editState } from 'src/app/interfaces/editState.model';
import { thread } from 'src/app/interfaces/thread.model';
import { PopupService } from 'src/app/services/popup.service';
import { ThreadService } from 'src/app/services/thread.service';

@Component({
  selector: 'app-manage-threads',
  templateUrl: './manage-threads.component.html',
  styleUrls: ['./manage-threads.component.scss']
})
export class ManageThreadsComponent extends PopupTemplateComponent implements OnInit{
  threads$!:Observable<thread[]>
  operations:editState[]=[];
  refresh$=new BehaviorSubject<boolean>(true);
  constructor(
    private _popupService:PopupService,
    private _threadService:ThreadService
    ){
    super();
  }
  ngOnInit(): void {
    this.isVisible=true;
    this.threads$=this.refresh$.pipe(switchMap(_=> this._threadService.getNotAcceptedThreads()
      .pipe(
        map(e=>e.map(e2=>e2).filter(e3=>!this.operations.map(e4=>JSON.stringify(e4.thread)).includes(JSON.stringify(e3))))
      )
    ))
    
  }
  changeState(value:boolean,thread:thread){
    let newState:editState={
      id:thread.id,
      thread:thread,
      from:thread.accepted,
      to:value
    }
    if(!this.operations.map(e=>JSON.stringify(e)).includes(JSON.stringify(newState))){
      this.operations.push(newState);
      this.refresh$.next(true)
    }
  }
  exit(){
    this._popupService.clearPopup();
  }
  saveChanges(){
    let body=this.operations.map(e=>e.id);
    this._threadService.setToAccept(body).subscribe((res)=>{
      console.log(res);
    })
  }
}
