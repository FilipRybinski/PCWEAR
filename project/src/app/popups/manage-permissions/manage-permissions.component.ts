import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { permission } from 'src/app/interfaces/permission.model';
import { userPermission } from 'src/app/interfaces/userPermission.model';
import { AccountService } from 'src/app/services/account.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-manage-permissions',
  templateUrl: './manage-permissions.component.html',
  styleUrls: ['./manage-permissions.component.scss'],
})
export class ManagePermissionsComponent extends PopupTemplateComponent implements OnInit{
  users$!:Observable<userPermission[]>;
  arrayChanges:userPermission[]=[];
  currentSelected!:number;
  constructor(private _popupService:PopupService,private _accountService:AccountService,private _toastService:ToastrService){
    super();
  }
  ngOnInit(): void {
    this.waiting=false;
    this.users$=this._accountService.getUsers();
  }
  changePermission(user:userPermission,value:number){
    user.roleId=value;
    let convertedArray=this.arrayChanges.map(e=>JSON.stringify(e.id));
    let id=JSON.stringify(user.id);
    if(convertedArray.includes(id)){
      let index=convertedArray.indexOf(id);
      this.arrayChanges[index]=user;
      return;
    }
    this.arrayChanges.push(user);
  }
  saveChanges(){
    if(this.arrayChanges.length==0){
      this.exit();
      return;
    }
    let body:permission[]=this.arrayChanges.map(e=>{return {userId:e.id,roleId:e.roleId}});
    this._accountService.updatePermissions(body).subscribe(
      {
        next:(res)=>{
          this._toastService.success('','Successfully updated permissions');
        },
        error:(err)=>{
          this._toastService.error(err.error.Message,err.error.Code);
        }
    })
    this.exit();
  }
  exit(){
    this._popupService.clearPopup();
  }
}
