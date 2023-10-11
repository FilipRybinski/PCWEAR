import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {zoomInOnEnterAnimation,zoomOutOnLeaveAnimation} from 'angular-animations';
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  animations:[zoomInOnEnterAnimation({ duration: 200, delay: 0}),zoomOutOnLeaveAnimation({ duration: 200, delay: 0})]
})
export class DropdownComponent implements OnInit{
  width!:number;
  height!:number;
  isOpen:boolean=false; 
  @ViewChild('content_container') content_container!:ElementRef;
  @ViewChild('dropdown') dropdown!:ElementRef;
  @HostListener('document:click',['$event.target'])
  handleClick(e:Event){
    if(this.content_container){
      if(this.content_container.nativeElement.contains(e)){
        this.toggleOpen();
        return;
      }
      if(!this.dropdown.nativeElement.contains(e)){
        this.toggleOpen();
        return;
      }
    }
    
  }
  constructor(private _element:ElementRef){}
  ngOnInit(): void {
    this.getSize();
  }
  toggleOpen(){
    this.isOpen=!this.isOpen;
    this.getSize();
  }
  getSize(){
    this.width=this._element.nativeElement.parentNode.offsetWidth;
    this.height=this._element.nativeElement.parentNode.offsetHeight+10;
  }
}
