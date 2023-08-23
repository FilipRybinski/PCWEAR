import { Component } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent {
  constructor(private _popupService:PopupService){}
  openPopup(name:string){
    this._popupService.openPopup(name,{});
  }
}
