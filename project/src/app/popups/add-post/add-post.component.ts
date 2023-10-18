import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { postAdd } from 'src/app/interfaces/postAdd.model';
import { AccountService } from 'src/app/services/account.service';
import { PopupService } from 'src/app/services/popup.service';
import { PostService } from 'src/app/services/post.service';
import { ThreadService } from 'src/app/services/thread.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent extends PopupTemplateComponent implements OnInit{
  threadId!:number;
  postForm!:FormGroup;
  constructor(
    private _popupService:PopupService,
    private _postService:PostService,
    private _threadService:ThreadService,
    private _formBuilder:FormBuilder,
    private _toastService:ToastrService,
    private _accountService:AccountService
    ){
    super();
  }
  ngOnInit(): void {
    this.threadId=this._threadService.getThreadId
    this.postForm=this._formBuilder.group({
      title:[,Validators.required],
      body:[,Validators.required]
    })
  }
  exit(){
    this._popupService.clearPopup();
  }
  addPost(form:FormGroupDirective,event:Event){
    form.onSubmit(event);
    if(!this.postForm.valid)return;
    let body:postAdd={
      title:this.postForm.value.title,
      body:this.postForm.value.body
    }
    this._postService.addPost(this.threadId,body).subscribe(
      {
        next:(res)=>{
          this._threadService.refreshThread();
          this._toastService.success('Post added successfully','Created')
        },
        error:(err)=>{
          this._toastService.error(err.error.Message,`Operation failed ${err.error.Code}`);
        }
      }
    )
    this.exit();
  }get getUser(){
    return this._accountService.user ? true:false;
   }
}
