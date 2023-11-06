import { Component, Input } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  @Input() poupName!:string;
  @Input() data!:any;
  constructor(private _popupSerivce:PopupService,private _cookieService:CookieService){}
  openPopup(){
    this._popupSerivce.openPopup(this.poupName,this.data);
  }
  get getUser(){
    return this._cookieService.userPermission;
  }
}
