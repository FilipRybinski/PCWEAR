import { Component, Input, Output,EventEmitter, ViewChild, ElementRef, } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { category } from 'src/app/interfaces/category.model';
import {bounceInOnEnterAnimation,bounceOutOnLeaveAnimation,zoomInOnEnterAnimation,zoomOutOnLeaveAnimation} from 'angular-animations';

@Component({
  selector: 'app-category-picker',
  templateUrl: './category-picker.component.html',
  styleUrls: ['./category-picker.component.scss'],
  animations:[
    bounceInOnEnterAnimation({ duration: 300, delay: 100}),
    bounceOutOnLeaveAnimation({ duration: 300, delay: 0}),
    zoomInOnEnterAnimation({ duration: 200, delay: 0}),
    zoomOutOnLeaveAnimation({ duration: 200, delay: 0})
  ]
})
export class CategoryPickerComponent {
 @Input() category$!:Observable<category[]>;
 @Input() selectedCategoryArray!:category[];
 @Input() form!:FormGroupDirective;
 @Output() category:EventEmitter<category[]>= new EventEmitter();
 isOpen:boolean=false;
 @ViewChild('field') filed!:ElementRef;
 @ViewChild('dropdown') dropdown!:ElementRef;
 selectedCategory(category:category){
  if(this.selectedCategoryArray.map(e=>JSON.stringify(e)).includes(JSON.stringify(category))){
    this.selectedCategoryArray=this.selectedCategoryArray.filter(t=>t.id!=category.id);
    }else{
    this.selectedCategoryArray.push(category);
    }
    this.category.emit(this.selectedCategoryArray);
  }
  toggleOpen(event:Event){
    if( (this.filed.nativeElement.contains(event.target) && this.isOpen==false) ||
     ((this.isOpen && this.dropdown) && (!this.dropdown.nativeElement.contains(event.target) && this.isOpen==true))) this.isOpen=!this.isOpen;
  }
}
