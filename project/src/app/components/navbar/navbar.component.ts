import { Component , ElementRef, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('check') button!:ElementRef;
  constructor(private _accountService:AccountService,private _storageService:CookieService){
  }
  toggleOpen() {
    const body=document.querySelector('body');
    if(this.button!=null && body){
      this.button.nativeElement.checked=!this.button.nativeElement.checked;
      body.style.overflow=='hidden' ? body.style.removeProperty('overflow') : body.style.overflow='hidden';
    }
  }
  logout(){
    this._accountService.logout().subscribe(
      {
        next:(res)=>{
          this._storageService.clear();
          this._accountService.currentLoggedUser=res
        }
    })
  }
  get getUser(){
    return this._storageService.userPermission;
  }
}
