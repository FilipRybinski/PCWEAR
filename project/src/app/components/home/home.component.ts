import { Component} from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private _popupService:PopupService,private _accountService:AccountService){
  }
  openPopup(){
  this._popupService.openPopup('test',{});
  }
  getUser(){
    return this._accountService.user;
  }
}
