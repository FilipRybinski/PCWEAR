import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.models';
import { AccountService } from 'src/app/services/account.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  currentLoggedUser!:User;
  constructor(private _popupService:PopupService,private _accountService:AccountService){
  }
  ngOnInit(): void {
    this._accountService.currentLoggedUser$.subscribe((res)=>{
      this.currentLoggedUser=res;
    })
  }
    openPopup(){
    this._popupService.openPopup('test',{});
  }

}
