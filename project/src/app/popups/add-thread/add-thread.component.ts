import { Component, OnInit } from '@angular/core';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { AccountService } from 'src/app/services/account.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-add-thread',
  templateUrl: './add-thread.component.html',
  styleUrls: ['./add-thread.component.scss']
})
export class AddThreadComponent extends PopupTemplateComponent implements OnInit{
  constructor(private _popupService:PopupService,private _accountService:AccountService){
    super();
  }
  ngOnInit(): void {
    this.isVisible=true;
    this.access=false;
  }
  exit(){
    this._popupService.clearPopup();
  }
  getUser(){
   return this._accountService.user ? true:false;
  }
}
