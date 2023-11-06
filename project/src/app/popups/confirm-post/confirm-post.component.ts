import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { PopupService } from 'src/app/services/popup.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-confirm-post',
  templateUrl: './confirm-post.component.html',
  styleUrls: ['./confirm-post.component.scss']
})
export class ConfirmPostComponent extends PopupTemplateComponent implements OnInit{
  data:any;
  constructor(
    private _popupSerivce:PopupService,
    private _postService:PostService,
    private _toastSerivce:ToastrService){
    super();
  }
  ngOnInit(): void {

  }
  confirm(){
    this._postService.removePost(this.data).subscribe({
      next:(res)=>{
        this._toastSerivce.success('Post has been deleted','Operation successfuly');
        this._postService.refreshPosts();
      },
      error:(err)=>{
        this._toastSerivce.error('',err.error.Message);
      }
    })
    this.exit();
  }
  exit(){
    this._popupSerivce.clearPortal();
  }
}
