import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, combineLatestWith, map, startWith } from 'rxjs';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { MotherboardFilter } from 'src/app/interfaces/motherboardFilter.model';
import { MotherboardService } from 'src/app/services/motherboard.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-search-motherboard',
  templateUrl: './search-motherboard.component.html',
  styleUrls: ['./search-motherboard.component.scss']
})
export class SearchMotherboardComponent extends PopupTemplateComponent implements OnInit{
  filterForm!:FormGroup;
  suggestionName$!:Observable<string[]>;
  suggestionSocket$!:Observable<string[]>;
  suggestionFormFactor$!:Observable<string[]>;
  suggestionMaxMemory$!:Observable<number[]>;
  suggestionMemorySlot$!:Observable<number[]>;
  suggestionColor$!:Observable<string[]>;
  constructor(
    private _popupSerive:PopupService,
    private _formBuilder:FormBuilder,
    private _motherboardService:MotherboardService){
    super();
  }
  ngOnInit(): void {
    this.filterForm=this._formBuilder.group({
      name:[],
      socket:[],
      formFactor:[],
      maxMemory:[],
      memorySlot:[],
      color:[]
    })
    this._motherboardService.pagination.getQueryParams.keys().forEach(e=>{
      if(this.filterForm.get(e)){
        this.filterForm.get(e)?.setValue(this._motherboardService.pagination.getQueryParams.get(e));
      }
    });
    this.suggestionName$=this._motherboardService.motherboardFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.name)}))
    .pipe(combineLatestWith(this.filterForm.controls['name'].valueChanges.pipe(startWith(''))),
      map(([names,filter])=>names.filter((name)=>name?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));
      
    this.suggestionSocket$=this._motherboardService.motherboardFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.socket)}))
    .pipe(combineLatestWith(this.filterForm.controls['socket'].valueChanges.pipe(startWith(''))),
      map(([sockets,filter])=>sockets.filter((socket)=>socket?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));
  
    this.suggestionFormFactor$=this._motherboardService.motherboardFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.formFactor)}))
    .pipe(combineLatestWith(this.filterForm.controls['formFactor'].valueChanges.pipe(startWith(''))),
      map(([formFactors,filter])=>formFactors.filter((formFactor)=>formFactor?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));

    this.suggestionMaxMemory$=this._motherboardService.motherboardFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.maxMemory)}))
    .pipe(combineLatestWith(this.filterForm.controls['maxMemory'].valueChanges.pipe(startWith(''))),
      map(([maxMemories,filter])=>maxMemories.filter((memory)=>memory!=filter)));

    this.suggestionMemorySlot$=this._motherboardService.motherboardFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.memorySlot)}))
    .pipe(combineLatestWith(this.filterForm.controls['memorySlot'].valueChanges.pipe(startWith(''))),
      map(([memorySlots,filter])=>memorySlots.filter((memorySlot)=>memorySlot!=filter)));
    
    this.suggestionColor$=this._motherboardService.motherboardFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.color)}))
    .pipe(combineLatestWith(this.filterForm.controls['color'].valueChanges.pipe(startWith(''))),
      map(([colors,filter])=>colors.filter((color)=>color?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));
  
  }
  bindProperty(value:string|number,property:string){
    this.filterForm.get(property)?.setValue(value);
  }
  resetFilter(){
    this.filterForm.reset();
    this.filterForm.controls['name'].patchValue('');
    this.filterForm.controls['socket'].patchValue('');
    this.filterForm.controls['formFactor'].patchValue('');
    this.filterForm.controls['maxMemory'].patchValue('');
    this.filterForm.controls['memorySlot'].patchValue('');
    this.filterForm.controls['color'].patchValue('');
    this._motherboardService.pagination.setQueryParams(true);
    this._motherboardService.refreshMotherboards();
  }
  saveFilter(){
    let filter:MotherboardFilter={
      name:this.filterForm.value.name,
      socket:this.filterForm.value.socket,
      formFactor:this.filterForm.value.cores,
      maxMemory:this.filterForm.value.maxMemory,
      memorySlot:this.filterForm.value.memorySlot,
      color:this.filterForm.value.color,
    }
    this.exit();
    this._motherboardService.pagination.setQueryParams(false,filter);
    this._motherboardService.refreshMotherboards();
  }
  exit(){
    this._popupSerive.clearPopup();
  }

}
