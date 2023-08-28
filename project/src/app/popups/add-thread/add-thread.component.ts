import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { toastConfig } from 'src/app/constants/toastConfig';
import { category } from 'src/app/interfaces/category.model';
import { thread } from 'src/app/interfaces/thread.model';
import { AccountService } from 'src/app/services/account.service';
import { PopupService } from 'src/app/services/popup.service';
import { ThreadService } from 'src/app/services/thread.service';

@Component({
  selector: 'app-add-thread',
  templateUrl: './add-thread.component.html',
  styleUrls: ['./add-thread.component.scss']
})
export class AddThreadComponent extends PopupTemplateComponent implements OnInit{
  threadForm!:FormGroup;
  threadCategory$!:Observable<category[]>;
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
      category:[,Validators.required],
      description:[,Validators.required]
    })
    this.threadCategory$=this._threadService.getCategories();
  }
  addThread(form:FormGroupDirective,event:Event){
    console.log(this.threadForm.value.category)
    form.onSubmit(event);
    if(!this.threadForm.valid)return;
    console.log(this.threadForm.value.category)
    let body:thread={
      title:this.threadForm.value.title,
      description:this.threadForm.value.description,
      categories:[this.threadForm.value.category]
    }
    console.log(body);
    this._threadService.addThread(body).subscribe((res)=>{
      this.waiting=true;
      this._toastService.success(`Created `,'Thread added successfully',toastConfig);
      this.waiting=false;
      this.exit();
    },(err)=>{
      console.log(err);
      this._toastService.error('','Operation failed',toastConfig);
      this.exit();
    })
    form.resetForm();

  }
  exit(){
    this._popupService.clearPopup();
  }
  getUser(){
   return this._accountService.user ? true:false;
  }
}
