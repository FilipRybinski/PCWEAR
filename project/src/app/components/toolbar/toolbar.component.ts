import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent{
  pageSizes:number[]=[5,10,15,20,40,60];
  editSizes:number[]=[];
  isOpen:boolean=false;
  constructor(private _popupService:PopupService){}
  @Input() currentPage!:number;
  @Input() currentPageSize!:number;
  @Input() dataLength!:number;
  @Input() findPopupName!:string;
  @Output() pageSize=new EventEmitter<number>();
  @Output() next=new EventEmitter<number>();
  @Output() previous=new EventEmitter<number>();
  @Output() resetEvent=new EventEmitter<void>();
  @ViewChild('filed') filed!:ElementRef;
  @HostListener('document:click', ['$event.target'])
  clickOut(event:Event) {
    if(!this.filed.nativeElement.contains(event) ){
     this.isOpen=false;
    }
  }
  openFilter(){
    this._popupService.openPopup(this.findPopupName,{});
  }
  ngOnChanges(): void {
    this.editSizes=[...this.pageSizes].filter(e=>e!=this.currentPageSize);
  }
  toggleOpen(){
    this.isOpen=!this.isOpen
  }
  resetFilter(){
    this.resetEvent.emit();
  }
  changePageSize(size:number){
    this.pageSize.emit(size);
    this.toggleOpen();
  }
}
