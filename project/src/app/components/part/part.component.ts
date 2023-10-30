import { Component, Input } from '@angular/core';
import {fadeInOnEnterAnimation} from 'angular-animations';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss'],
  animations:[
    fadeInOnEnterAnimation({delay:300}),
  ]
})
export class PartComponent {
  @Input() partId!:number;
  @Input() imageUrl!:string;
  @Input() name!:string;
  @Input() comments!:number;
  @Input() rating!:number;
  constructor(private _popupService:PopupService){}
  openPopup(name:string,id:number,partName:string){
    this._popupService.openPopup(name,{name:partName,partId:id});
  }
}
