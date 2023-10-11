import { Component , ElementRef, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('check') button!:ElementRef;
  constructor(private _accountService:AccountService){
  }
  toggleOpen() {
    const body=document.querySelector('body');
    if(this.button!=null && body){
      this.button.nativeElement.checked=!this.button.nativeElement.checked;
      body.style.overflow=='hidden' ? body.style.removeProperty('overflow') : body.style.overflow='hidden';
    }
  }
  logout(){
    this._accountService.logout().subscribe({next:(res)=>this._accountService.currentLoggedUser=res})
  }
  getUser(){
    return this._accountService.user;
  }
}
