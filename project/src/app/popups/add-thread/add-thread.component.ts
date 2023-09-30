import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { category } from 'src/app/interfaces/category.model';
import { AccountService } from 'src/app/services/account.service';
import { PopupService } from 'src/app/services/popup.service';
import { ThreadService } from 'src/app/services/thread.service';
import {bounceInOnEnterAnimation,bounceOutOnLeaveAnimation,zoomInOnEnterAnimation,zoomOutOnLeaveAnimation} from 'angular-animations';
import { threadAdd } from 'src/app/interfaces/threadAdd.model';

@Component({
  selector: 'app-add-thread',
  templateUrl: './add-thread.component.html',
  styleUrls: ['./add-thread.component.scss'],
  animations:[
    bounceInOnEnterAnimation({ duration: 300, delay: 100}),
    bounceOutOnLeaveAnimation({ duration: 300, delay: 0}),
    zoomInOnEnterAnimation({ duration: 200, delay: 0}),
    zoomOutOnLeaveAnimation({ duration: 200, delay: 0})
  ]
})
export class AddThreadComponent extends PopupTemplateComponent implements OnInit{
  threadForm!:FormGroup;
  threadCategory$!:Observable<category[]>;
  selectedCategoryArray:category[]=[];
  isOpen:boolean=false;
  @ViewChild('field') filed!:ElementRef;
  constructor(
    private _popupService:PopupService,
    private _accountService:AccountService,
    private _formBuilder:FormBuilder,
    private _threadService:ThreadService,
    private _toastService:ToastrService
    ){
    super();
  }
  ngOnInit(): void {
    this.isVisible=true;
    this.threadForm=this._formBuilder.group({
      title:[,Validators.required],
      description:[,Validators.required]
    })
    this.threadCategory$=this._threadService.getCategories();
  }
  addThread(form:FormGroupDirective,event:Event){
    form.onSubmit(event);
    if(!this.threadForm.valid && this.selectedCategoryArray.length==0)return;
    let body:threadAdd={
      title:this.threadForm.value.title,
      description:this.threadForm.value.description,
      categories:this.selectedCategoryArray
    }
    this._threadService.addThread(body).subscribe((res)=>{
      this.waiting=true;
      this._toastService.success(`Created `,'Thread added successfully');
      this.waiting=false;
      this._threadService.refreshThreads();
      this.exit();
    },(err)=>{
      console.log(err);
      this._toastService.error('','Operation failed');
      this.exit();
    })
    form.resetForm();

  }
  selectedCategory(category:category){
    let maped=this.selectedCategoryArray.map(c=>c.id);
    if(maped.includes(category.id)){
      this.selectedCategoryArray=this.selectedCategoryArray.filter(t=>t.id!=category.id);
    }else{
      this.selectedCategoryArray.push(category);
    }
  }
  toggleOpen(event:Event){
    if(event.target==this.filed.nativeElement) this.isOpen=!this.isOpen;
  }
  exit(){
    this._popupService.clearPopup();
  }
  getUser(){
   return this._accountService.user ? true:false;
  }
}
