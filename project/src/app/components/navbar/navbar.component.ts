import { Component , ViewChild } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('check') button!:HTMLInputElement;
  constructor(private _accountService:AccountService){
  }
  closeMenu() {
    if(this.button!=null) this.button.checked = false;
  }
  logout(){
    this._accountService.logout().subscribe({next:(res)=>this._accountService.currentLoggedUser=res})
  }
  getUser(){
    return this._accountService.user;
  }
}
