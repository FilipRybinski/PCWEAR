import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, combineLatestWith, map, startWith } from 'rxjs';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { caseFilter } from 'src/app/interfaces/caseFilter.model';
import { CaseService } from 'src/app/services/case.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-search-case',
  templateUrl: './search-case.component.html',
  styleUrls: ['./search-case.component.scss']
})
export class SearchCaseComponent extends PopupTemplateComponent implements OnInit{
  filterForm!:FormGroup;
  suggestionName$!:Observable<string[]>;
  suggestionType$!:Observable<string[]>;
  suggestionColor$!:Observable<string[]>;
  suggestionSidePanel$!:Observable<string[]>;
  suggestionExternalVolume$!:Observable<number[]>;
  constructor(
    private _popupSerive:PopupService,
    private _formBuilder:FormBuilder,
    private _caseService:CaseService){
    super();
  }
  ngOnInit(): void {
    this.filterForm=this._formBuilder.group({
      name:[],
      type:[],
      color:[],
      sidePanel:[],
      externalVolume:[],
    });
    this._caseService.pagination.getQueryParams.keys().forEach(e=>{
      if(this.filterForm.get(e)){
        this.filterForm.get(e)?.setValue(this._caseService.pagination.getQueryParams.get(e));
      }
    });
    this.suggestionName$=this._caseService.caseFilter$
      .pipe(map(e=>{ return e.map(e2=>e2.name)}))
      .pipe(combineLatestWith(this.filterForm.controls['name'].valueChanges.pipe(startWith(''))),
        map(([names,filter])=>names.filter((name)=>name?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));
        
    this.suggestionType$=this._caseService.caseFilter$
      .pipe(map(e=>{ return e.map(e2=>e2.type)}))
      .pipe(combineLatestWith(this.filterForm.controls['type'].valueChanges.pipe(startWith(''))),
        map(([types,filter])=>types.filter((type)=>type?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));
        
    this.suggestionColor$=this._caseService.caseFilter$
      .pipe(map(e=>{ return e.map(e2=>e2.color)}))
      .pipe(combineLatestWith(this.filterForm.controls['color'].valueChanges.pipe(startWith(''))),
        map(([colors,filter])=>colors.filter((color)=>color?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));
    
    this.suggestionSidePanel$=this._caseService.caseFilter$
      .pipe(map(e=>{ return e.map(e2=>e2.sidePanel)}))
      .pipe(combineLatestWith(this.filterForm.controls['sidePanel'].valueChanges.pipe(startWith(''))),
        map(([sidePanels,filter])=>sidePanels.filter((sidePanel)=>sidePanel?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));
        
    this.suggestionExternalVolume$=this._caseService.caseFilter$
      .pipe(map(e=>{ return e.map(e2=>e2.externalVolume)}))
      .pipe(combineLatestWith(this.filterForm.controls['externalVolume'].valueChanges.pipe(startWith(''))),
        map(([externalVolumes,filter])=>externalVolumes.filter((externalVolume)=>externalVolume!=filter)));    
  }
  bindProperty(value:string|number,property:string){
    this.filterForm.get(property)?.setValue(value);
  }
  resetFilter(){
    this.filterForm.reset();
    this.filterForm.controls['name'].patchValue('');
    this.filterForm.controls['type'].patchValue('');
    this.filterForm.controls['color'].patchValue('');
    this.filterForm.controls['sidePanel'].patchValue('');
    this.filterForm.controls['externalVolume'].patchValue('');
    this._caseService.pagination.setQueryParams(true);
    this._caseService.refreshCases();
  }
  saveFilter(){
    let filter:caseFilter={
      name:this.filterForm.value.name,
      type:this.filterForm.value.type,
      color:this.filterForm.value.color,
      sidePanel:this.filterForm.value.sidePanel,
      externalVolume:this.filterForm.value.externalVolume,
    }
    this.exit();
    this._caseService.pagination.setQueryParams(false,filter);
    this._caseService.refreshCases();
  }
  exit(){
    this._popupSerive.clearPopup();
  }

}
