import { Component, OnInit } from '@angular/core';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-add-thread',
  templateUrl: './add-thread.component.html',
  styleUrls: ['./add-thread.component.scss']
})
export class AddThreadComponent extends PopupTemplateComponent implements OnInit{
  constructor(private _popupService:PopupService){
    super();
  }
  ngOnInit(): void {
    this.isVisible=true;
  }
  exit(){
    this._popupService.clearPopup();
  }
}
