import { Component, Input, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Part } from 'src/app/interfaces/part.model';
import { ComponentsService } from 'src/app/services/components.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent{
  @Input() parts$!:Observable<any>;
  @Input() paginationVariable!:number;
  constructor(
    private _componentsService:ComponentsService,
    private _popupService:PopupService
    ){}
  // pagination(value:number){
  //   this._componentsService.setPage=value;
  // }
  // changePageSize(pageSize:number){
  //   this._componentsService.setPageSize=pageSize
  // }
  // openPopup(name:string){
  //   this._popupService.openPopup(name,{});
  // }
  // resetFilter(){
  //   this._componentsService.setQueryParams(true);
  // }
  // get page(){
  //   return this._componentsService.getPage;
  // }
  // get pageSize(){
  //   return this._componentsService.getPageSize;
  // }

}
