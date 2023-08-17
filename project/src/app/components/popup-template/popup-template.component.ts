import { Component, ElementRef, HostListener, ViewChild,EventEmitter } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-popup-template',
  templateUrl: './popup-template.component.html',
  styleUrls: ['./popup-template.component.scss'],
})
export class PopupTemplateComponent {
  constructor(private _popupService:PopupService){}
  isVisible:boolean=false;
  waiting:boolean=false;
  success:boolean=false;
  failed:boolean=false;
  close:EventEmitter<any>=new EventEmitter();
  @ViewChild('popupBackground',{static:false}) popupBackground!:ElementRef;
  @HostListener('document:keydown.escape', ['$event'])
   onKeydownHandler(event: KeyboardEvent) {
    this.closePopup();
}
  @HostListener('document:click',['$event'])
  clickOut(event:Event){
    if(this.popupBackground?.nativeElement.isEqualNode(event.target)){
      this.closePopup();
    }
  }
  closePopup(){
    this._popupService.clearPopup();
  }
}
