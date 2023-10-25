import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent{
  pageSizes:number[]=[5,10,15,20];
  editSizes:number[]=[];
  isOpen:boolean=false;
  @Input() currentValue!:number;
  @Output() pageSize=new EventEmitter<number>();
  @ViewChild('filed') filed!:ElementRef;
  @HostListener('document:click', ['$event.target'])
  clickOut(event:Event) {
    if(!this.filed.nativeElement.contains(event) ){
     this.isOpen=false;
    }
  }
  ngOnChanges(): void {
    this.editSizes=[...this.pageSizes].filter(e=>e!=this.currentValue);
  }
  toggleOpen(){
    this.isOpen=!this.isOpen
  }
  changePageSize(size:number){
    this.pageSize.emit(size);
    this.toggleOpen();
  }
}
