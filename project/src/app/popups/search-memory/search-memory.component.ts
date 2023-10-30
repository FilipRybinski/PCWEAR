import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, combineLatestWith, map, startWith } from 'rxjs';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { MemoryFilter } from 'src/app/interfaces/memoryFilter.model';
import { MemoryService } from 'src/app/services/memory.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-search-memory',
  templateUrl: './search-memory.component.html',
  styleUrls: ['./search-memory.component.scss']
})
export class SearchMemoryComponent extends PopupTemplateComponent implements OnInit{
  filterForm!:FormGroup;
  suggestionName$!:Observable<string[]>;
  suggestionSpeed$!:Observable<number[]>;
  suggestionModulesLower$!:Observable<number[]>;
  suggestionModulesUpper$!:Observable<number[]>;
  suggestionCl$!:Observable<number[]>;
  suggestionColor$!:Observable<string[]>;

  constructor(
    private _popupSerive:PopupService,
    private _formBuilder:FormBuilder,
    private _memoryService:MemoryService){
    super();
  }
  ngOnInit(): void {
    this.filterForm=this._formBuilder.group({
      name:[],
      speed:[],
      modulesLower:[],
      modulesUpper:[],
      cl:[],
      color:[],
    });
    this._memoryService.pagination.getQueryParams.keys().forEach(e=>{
      if(this.filterForm.get(e)){
        this.filterForm.get(e)?.setValue(this._memoryService.pagination.getQueryParams.get(e));
      }
    });
    this.suggestionName$=this._memoryService.memoriesFilter$
      .pipe(map(e=>{ return e.map(e2=>e2.name)}))
      .pipe(combineLatestWith(this.filterForm.controls['name'].valueChanges.pipe(startWith(''))),
        map(([names,filter])=>names.filter((name)=>name?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));
    
    this.suggestionSpeed$=this._memoryService.memoriesFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.speed)}))
    .pipe(combineLatestWith(this.filterForm.controls['speed'].valueChanges.pipe(startWith(''))),
      map(([speeds,filter])=>speeds.filter((speed)=>speed!=filter)));

    this.suggestionModulesLower$=this._memoryService.memoriesFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.modulesLower)}))
    .pipe(combineLatestWith(this.filterForm.controls['modulesLower'].valueChanges.pipe(startWith(''))),
      map(([moduleLowers,filter])=>moduleLowers.filter((moduleLower)=>moduleLower!=filter)));
    
    this.suggestionModulesUpper$=this._memoryService.memoriesFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.modulesUpper)}))
    .pipe(combineLatestWith(this.filterForm.controls['modulesUpper'].valueChanges.pipe(startWith(''))),
      map(([moduleUppers,filter])=>moduleUppers.filter((moduleUpper)=>moduleUpper!=filter)));

    this.suggestionCl$=this._memoryService.memoriesFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.cl)}))
    .pipe(combineLatestWith(this.filterForm.controls['cl'].valueChanges.pipe(startWith(''))),
      map(([cls,filter])=>cls.filter((cl)=>cl!=filter)));

    this.suggestionColor$=this._memoryService.memoriesFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.color)}))
    .pipe(combineLatestWith(this.filterForm.controls['color'].valueChanges.pipe(startWith(''))),
      map(([colors,filter])=>colors.filter((color)=>color!=filter)));
}
  bindProperty(value:string|number,property:string){
    this.filterForm.get(property)?.setValue(value);
  }
  resetFilter(){
    this.filterForm.reset();
    this.filterForm.controls['name'].patchValue('');
    this.filterForm.controls['speed'].patchValue('');
    this.filterForm.controls['modulesLower'].patchValue('');
    this.filterForm.controls['modulesUpper'].patchValue('');
    this.filterForm.controls['cl'].patchValue('');
    this.filterForm.controls['color'].patchValue('');
    this._memoryService.pagination.setQueryParams(true);
    this._memoryService.refreshMemories();
  }
  saveFilter(){
    let filter:MemoryFilter={
      name:this.filterForm.value.name,
      speed:this.filterForm.value.speed,
      modulesLower:this.filterForm.value.modulesLower,
      modulesUpper:this.filterForm.value.modulesUpper,
      cl:this.filterForm.value.cl,
      color:this.filterForm.value.color,

    }
    this.exit();
    this._memoryService.pagination.setQueryParams(false,filter);
    this._memoryService.refreshMemories();
  }
  exit(){
    this._popupSerive.clearPopup();
  }

}
