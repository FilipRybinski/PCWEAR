import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import {bounceInOnEnterAnimation,bounceOutOnLeaveAnimation} from 'angular-animations';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations:[
    bounceInOnEnterAnimation({ duration: 100, delay: 0}),
    bounceOutOnLeaveAnimation({ duration: 100, delay: 0})
  ]
})
export class SettingsComponent implements OnInit{
  imageSrc!:string;
  formData!: FormData;
  uploaded:boolean=false;
  progress: number=0;
  message!: string;
  constructor(
    private _accountService:AccountService,
    private _toastSerivce:ToastrService,
    private _popupService:PopupService
  ){}
  ngOnInit(): void {
    setTimeout(()=>{this.imageSrc=this._accountService.currentLoggedUser.pathUserImage},100);
  }
    
  onFilechange(event: Event) {
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (!file)return;
    let reader = new FileReader();
    this.formData=new FormData();
    this.uploaded=true;
    reader.readAsDataURL(file);
    reader.onload=()=>{
      if(reader.result)
      this.imageSrc=reader.result.toString();
    }
    this.formData.append('File', file);

  }
  upload() {
    this._accountService.setUserIcon(this.formData).subscribe({
      next: (event) => {
      if (event.type === HttpEventType.UploadProgress && event.total)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this._toastSerivce.success('Your avatar will be available everywhere','Upload success')
        setTimeout(() => {
          this.progress=0;
          this.uploaded=false;
        }, 500);
      }
    },
    error: (err) => console.log(err)
  });
  }
  edit(name:string){
    let data={
      name:name,
    }
    this._popupService.openPopup('edit-user-informations',data);
  }
  getUser(){
    return this._accountService.currentLoggedUser;
  }
}
