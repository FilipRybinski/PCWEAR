import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, combineLatestWith, map, startWith } from 'rxjs';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { processorsFilter } from 'src/app/interfaces/processorsFilter.model';
import { PopupService } from 'src/app/services/popup.service';
import { ProcessorsService } from 'src/app/services/processors.service';

@Component({
  selector: 'app-search-processor',
  templateUrl: './search-processor.component.html',
  styleUrls: ['./search-processor.component.scss']
})
export class SearchProcessorComponent extends PopupTemplateComponent implements OnInit{
  filterForm!:FormGroup;
  suggestionName$!:Observable<string[]>;
  suggestionCores$!:Observable<number[]>;
  suggestionThreads$!:Observable<number[]>;
  suggestionTdp$!:Observable<number[]>;
  suggestionSocket$!:Observable<string[]>;
  constructor(
    private _popupSerive:PopupService,
    private _formBuilder:FormBuilder,
    private _processorSerivce:ProcessorsService){
    super();
  }
  ngOnInit(): void {
    this.filterForm=this._formBuilder.group({
      name:[],
      cores:[],
      threads:[],
      tdp:[],
      graphics:[],
      socket:[],
    });
    this._processorSerivce.pagination.getQueryParams.keys().forEach(e=>{
      if(this.filterForm.get(e)){
        this.filterForm.get(e)?.setValue(this._processorSerivce.pagination.getQueryParams.get(e));
      }
    });
    this.suggestionName$=this._processorSerivce.processorsFilter$
      .pipe(map(e=>{ return e.map(e2=>e2.name)}),
            map(e=>[...new Set(e)]))
      .pipe(combineLatestWith(this.filterForm.controls['name'].valueChanges.pipe(startWith(''))),
        map(([names,filter])=>names.filter((name)=>name?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));
    
    this.suggestionCores$=this._processorSerivce.processorsFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.cores)}),
          map(e=>[...new Set(e)]))
    .pipe(combineLatestWith(this.filterForm.controls['cores'].valueChanges.pipe(startWith(''))),
      map(([cores,filter])=>cores.filter((core)=>core!=filter)));

    this.suggestionThreads$=this._processorSerivce.processorsFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.threads)}),
          map(e=>[...new Set(e)]))
    .pipe(combineLatestWith(this.filterForm.controls['threads'].valueChanges.pipe(startWith(''))),
      map(([threads,filter])=>threads.filter((thread)=>thread!=filter)));

    this.suggestionTdp$=this._processorSerivce.processorsFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.tdp)}),
          map(e=>[...new Set(e)]))
    .pipe(combineLatestWith(this.filterForm.controls['tdp'].valueChanges.pipe(startWith(''))),
      map(([tdps,filter])=>tdps.filter((tdp)=>tdp!=filter)));

    this.suggestionSocket$=this._processorSerivce.processorsFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.socket)}),
          map(e=>[...new Set(e)]))
    .pipe(combineLatestWith(this.filterForm.controls['socket'].valueChanges.pipe(startWith(''))),
      map(([sockets,filter])=>sockets.filter((socket)=>socket!=filter)));
  }
  bindProperty(value:string|number,property:string){
    this.filterForm.get(property)?.setValue(value);
  }
  resetFilter(){
    this.filterForm.reset();
    this.filterForm.controls['name'].patchValue('');
    this.filterForm.controls['cores'].patchValue('');
    this.filterForm.controls['threads'].patchValue('');
    this.filterForm.controls['tdp'].patchValue('');
    this.filterForm.controls['graphics'].patchValue('');
    this.filterForm.controls['socket'].patchValue('');
    this._processorSerivce.pagination.setQueryParams(true);
    this._processorSerivce.refreshProcessors();
  }
  saveFilter(){
    let filter:processorsFilter={
      name:this.filterForm.value.name,
      cores:this.filterForm.value.cores,
      threads:this.filterForm.value.threads,
      graphics:this.filterForm.value.graphics,
      tdp:this.filterForm.value.tdp,
      socket:this.filterForm.value.socket,

    }
    this.exit();
    this._processorSerivce.pagination.setQueryParams(false,filter);
    this._processorSerivce.refreshProcessors();
  }
  exit(){
    this._popupSerive.clearPopup();
  }

}
