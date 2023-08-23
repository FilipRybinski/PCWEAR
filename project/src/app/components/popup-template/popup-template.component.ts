import { Component, ElementRef, HostListener, ViewChild,EventEmitter, Input, Output } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';
import {bounceInOnEnterAnimation,bounceOutOnLeaveAnimation} from 'angular-animations';

@Component({
  selector: 'app-popup-template',
  templateUrl: './popup-template.component.html',
  styleUrls: ['./popup-template.component.scss'],
  animations:[
    bounceInOnEnterAnimation({ duration: 300, delay: 100}),
    bounceOutOnLeaveAnimation({ duration: 300, delay: 0})
  ]
})
export class PopupTemplateComponent {
  constructor(){}
  @Input() isVisible:boolean=true;
  @Input() waiting:boolean=false;
  @Output() close:EventEmitter<any>=new EventEmitter();
  @ViewChild('popupBackground',{static:false}) popupBackground!:ElementRef;
  @HostListener('document:keydown.escape', ['$event'])
   onKeydownHandler(event: KeyboardEvent) {
    if(!this.waiting) this.closePopup();
}
  @HostListener('document:click',['$event'])
  clickOut(event:Event){
    if(this.popupBackground?.nativeElement.isEqualNode(event.target)){
      if(!this.waiting) this.closePopup();
    }
  }
  closePopup(){
    this.close.emit();
  }
}
