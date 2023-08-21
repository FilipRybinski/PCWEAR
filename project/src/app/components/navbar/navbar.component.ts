import { Component, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/user.models';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('check') button!:HTMLInputElement;
  currentLoggedUser!:User;
  constructor(private _accountService:AccountService){
    this.currentLoggedUser=this._accountService.currentLoggedUser;
  }
  closeMenu() {
    if(this.button!=null) this.button.checked = false;
  }
}
