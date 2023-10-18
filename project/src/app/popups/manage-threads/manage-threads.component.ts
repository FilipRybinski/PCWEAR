import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, combineLatestWith, map} from 'rxjs';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { editState } from 'src/app/interfaces/editState.model';
import { thread } from 'src/app/interfaces/thread.model';
import { PopupService } from 'src/app/services/popup.service';
import { ThreadService } from 'src/app/services/thread.service';
import {bounceInOnEnterAnimation,bounceOutOnLeaveAnimation} from 'angular-animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-threads',
  templateUrl: './manage-threads.component.html',
  styleUrls: ['./manage-threads.component.scss'],
  animations:[
    bounceInOnEnterAnimation({ duration: 300, delay: 100}),
    bounceOutOnLeaveAnimation({ duration: 300, delay: 0}),
  ]
})
export class ManageThreadsComponent extends PopupTemplateComponent implements OnInit{
  threads$!:Observable<thread[]>
  operations=new BehaviorSubject<editState[]>([]);
  currentSelected!:number;
  constructor(
    private _popupService:PopupService,
    private _threadService:ThreadService,
    private _toastService:ToastrService
    ){
    super();
  }
  ngOnInit(): void {
    this.isVisible=true;
    this.threads$=this._threadService.getNotAcceptedThreads()
      .pipe(
        combineLatestWith(this.operations.pipe(map(e=>e.map(e2=>e2.thread)))),
        map(([threads,filter])=>threads.filter((thread)=>!filter.map(e=>JSON.stringify(e)).includes(JSON.stringify(thread))))
        )

    
  }
  changeState(value:boolean,thread:thread){
    let newState:editState={
      id:thread.id,
      thread:thread,
      from:thread.accepted,
      to:value
    }
    if(!this.operations.value.map(e=>JSON.stringify(e)).includes(JSON.stringify(newState))){
      let newArray:editState[]=this.operations.value;
      newArray.push(newState)
      this.operations.next(newArray);
    }
  }
  exit(){
    this._popupService.clearPopup();
  }
  undoOperation(id:number){
    this.operations.next([...this.operations.value].filter(e=>e.id!=id))
  }
  saveChanges(){
    let body=this.operations.value.map(e=>e.id);
    this._threadService.setToAccept(body).subscribe((res)=>{

      this._toastService.success(`Accepted threads : ${body.toString()}`,'Successfully accepted')
    },(err)=>{
      this._toastService.success(err.error.Message,err.error.Code);
    })
    this.exit();
  }
}
