import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user.models';
import { AccountService } from 'src/app/services/account.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  currentLoggedUser!:User;
  constructor(private _popupService:PopupService,private _accountService:AccountService){
    this.currentLoggedUser=_accountService.currentLoggedUser;
  }
    openPopup(){
    this._popupService.openPopup('test',{});
  }
}
