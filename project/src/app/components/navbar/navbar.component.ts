import { Component , ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/user.models';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('check') button!:HTMLInputElement;
  constructor(public _accountService:AccountService){
  }
  closeMenu() {
    if(this.button!=null) this.button.checked = false;
  }
  logout(){
    this._accountService.logout().subscribe((res)=>{
      this._accountService.currentLoggedUser=res;
    })
  }
}
