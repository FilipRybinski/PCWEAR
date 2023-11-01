import { Component, Input } from '@angular/core';
import {tadaAnimation,fadeInOnEnterAnimation} from 'angular-animations';
import { AccountService } from 'src/app/services/account.service';
import { ComponentsService } from 'src/app/services/components.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss'],
  animations:[
    tadaAnimation(),
    fadeInOnEnterAnimation({delay:300}),
  ]
})
export class PartComponent {
  @Input() partId!:number;
  @Input() imageUrl!:string;
  @Input() name!:string;
  @Input() comments!:number;
  @Input() rating!:number;
  @Input() favourite!:boolean;
  @Input() disableRouterLink:boolean=false;
  constructor(
    private _popupService:PopupService,
    private _accountSerivce:AccountService,
    private _componentsService:ComponentsService
    ){}
  openPopup(name:string,id:number,partName:string){
    this._popupService.openPopup(name,{name:partName,partId:id});
  }
  get check(){
    return this._accountSerivce.user ? true:false;
  }
  handleFavourite(){
    this._componentsService.manageFavourite(this.partId).subscribe(
      {
        next:(res)=>{
          this.favourite=res;
        },
        error:(err)=>{
          console.log(err)
        }
      }
    )
  }
}
