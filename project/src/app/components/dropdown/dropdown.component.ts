import { Component, ElementRef, OnInit } from '@angular/core';
import {zoomInOnEnterAnimation,zoomOutOnLeaveAnimation} from 'angular-animations';
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  animations:[zoomInOnEnterAnimation({ duration: 200, delay: 0}),zoomOutOnLeaveAnimation({ duration: 300, delay: 100})]
})
export class DropdownComponent implements OnInit{
  width!:number;
  height!:number;
  isOpen:boolean=false; 
  constructor(private _element:ElementRef){}
  ngOnInit(): void {
    this.width=this._element.nativeElement.parentNode.offsetWidth+10;
    this.height=this._element.nativeElement.parentNode.offsetHeight+10;
  }
  toggleOpen(){
    this.isOpen=!this.isOpen;
  }
}
