import { Component, Input } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-add-part',
  templateUrl: './add-part.component.html',
  styleUrls: ['./add-part.component.scss']
})
export class AddPartComponent {
  @Input() popupName!:string;
  @Input() explenation!:string;
  @Input() admin:boolean=false;
  constructor(private _popupSerivce:PopupService,private _cookieSerive:CookieService){

  }
  openPopup(){
    this._popupSerivce.openPopup(this.popupName);
  }
  get getUser(){
    return this._cookieSerive.userPermission;
  }
}
