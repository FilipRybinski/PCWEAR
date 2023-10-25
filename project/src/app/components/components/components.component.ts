import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Part } from 'src/app/interfaces/part.model';
import { ComponentsService } from 'src/app/services/components.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit{
  parts$!:Observable<Part[]>;
  types$!:Observable<string[]>
  constructor(
    private _componentsService:ComponentsService,
    private _popupService:PopupService
    ){}
  ngOnInit(): void {
    this.parts$=this._componentsService.Parts$;
    this.types$=this._componentsService.getTypes();
  }
  openPopup(name:string){
    this._popupService.openPopup(name,{});
  }
  resetFilter(){
    this._componentsService.setQueryParams(true);
  }
  changePageSize(pageSize:number){
    this._componentsService.setPageSize=pageSize
  }
  get page(){
    return this._componentsService.getPage;
  }
  get pageSize(){
    return this._componentsService.getPageSize;
  }

}
