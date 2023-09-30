import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { threadFilter } from 'src/app/interfaces/threadFilter.model';
import { PopupService } from 'src/app/services/popup.service';
import { ThreadService } from 'src/app/services/thread.service';

@Component({
  selector: 'app-search-thread',
  templateUrl: './search-thread.component.html',
  styleUrls: ['./search-thread.component.scss']
})
export class SearchThreadComponent extends PopupTemplateComponent implements OnInit{
  filterForm!:FormGroup
  constructor(
    private _popupService:PopupService,
    private _formBuilder:FormBuilder,
    private _threadService:ThreadService){
    super();
  }
  ngOnInit(): void {
    this.isVisible=true;
    this.filterForm=this._formBuilder.group({
      title:[],
      description:[],
      category:[]
    })
  }
  saveFilter(){
    let filter:threadFilter={
      title:this.filterForm.value.title,
      description:this.filterForm.value.description,
      category:this.filterForm.value.category
    }
   this._threadService.setQueryParams(false,filter);
  }
  resetFilter(){
    this._threadService.setQueryParams(true);
  }
  exit(){
    this._popupService.clearPopup();
  }
}
