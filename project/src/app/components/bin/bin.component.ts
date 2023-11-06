import { Component, Input } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss']
})
export class BinComponent {
  @Input() id!:number;
  constructor(private _popupService:PopupService){}
  openPoup(){
    this._popupService.openPopup('confirm-post',this.id);
  }
}
