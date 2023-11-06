import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  openPopup$=new Subject<{name:string, data:any}>();
  clearPortal$=new Subject();
  clearPopup$=new Subject();
  constructor() { }
  openPopup(name:string,data?:any){
    this.openPopup$.next({name:name,data:data});
  }
  clearPortal(){
    this.clearPortal$.next(undefined);
  }
  clearPopup(){
    this.clearPopup$.next(undefined);
  }
}
