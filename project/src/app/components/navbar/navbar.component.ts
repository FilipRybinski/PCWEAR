import { Component,  OnDestroy,  OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/user.models';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit,OnDestroy{
  @ViewChild('check') button!:HTMLInputElement;
  currentLoggedUser!:User;
  constructor(private _accountService:AccountService){

  }
  ngOnInit(): void {
    this._accountService.currentLoggedUser$.subscribe((res)=>{
      this.currentLoggedUser=res;
    })
  }
  closeMenu() {
    if(this.button!=null) this.button.checked = false;
  }
  logout(){
    this._accountService.logout().subscribe((res)=>{
      this._accountService.currentLoggedUser$.next(res);
    })
  }
  ngOnDestroy(): void {
    this._accountService.currentLoggedUser$.unsubscribe();
  }
}
