import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { ComponentsService } from 'src/app/services/components.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-search-part',
  templateUrl: './search-part.component.html',
  styleUrls: ['./search-part.component.scss']
})
export class SearchPartComponent extends PopupTemplateComponent implements OnInit{
  types$!:Observable<string[]>;
  filterForm!:FormGroup;
  isOpen:boolean=false;
  constructor(
    private _componentsService:ComponentsService,
    private _formBuilder:FormBuilder,
    private _popupService:PopupService
    ){
    super();
  }
  ngOnInit(): void {
    this.types$=this._componentsService.getTypes();
    this.filterForm=this._formBuilder.group({
      type:[this._componentsService.getType,Validators.required]
    })
  }
  resetFilter(){

  }
  saveFilter(){
    this._componentsService.setQueryParams(this.filterForm.value.type)
  }
  bindType(name:string){
    this.filterForm.controls['type'].patchValue(name);
  }
  toggleOpen(){
    this.isOpen=!this.isOpen
  }
  exit(){
    this._popupService.clearPopup();
  }
}
