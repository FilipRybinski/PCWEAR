import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, combineLatestWith, map, startWith } from 'rxjs';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { HardDriveFilter } from 'src/app/interfaces/hard-driveFilter.model';
import { HardDriveService } from 'src/app/services/hard-drive.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-search-hard-drive',
  templateUrl: './search-hard-drive.component.html',
  styleUrls: ['./search-hard-drive.component.scss']
})
export class SearchHardDriveComponent extends PopupTemplateComponent implements OnInit{
  filterForm!:FormGroup;
  suggestionName$!:Observable<string[]>;
  suggestionCapacity$!:Observable<number[]>;
  suggestionType$!:Observable<string[]>;
  suggestionCache$!:Observable<number[]>;
  suggestionInterfaces$!:Observable<string[]>;
  constructor(
    private _popupSerive:PopupService,
    private _hardDriveService:HardDriveService,
    private _formBuilder:FormBuilder
    ){
    super();
  }
  ngOnInit(): void {
    this.filterForm=this._formBuilder.group({
      name:[],
      capacity:[],
      type:[],
      cache:[],
      interfaces:[],
    });
    this._hardDriveService.pagination.getQueryParams.keys().forEach(e=>{
      if(this.filterForm.get(e)){
        this.filterForm.get(e)?.setValue(this._hardDriveService.pagination.getQueryParams.get(e));
      }
    });
    this.suggestionName$=this._hardDriveService.hardDriveFilter$
      .pipe(map(e=>{ return e.map(e2=>e2.name)}),
            map(e=>[...new Set(e)]))
      .pipe(combineLatestWith(this.filterForm.controls['name'].valueChanges.pipe(startWith(''))),
        map(([names,filter])=>names.filter((name)=>name?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));

    this.suggestionCapacity$=this._hardDriveService.hardDriveFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.capacity)}),
          map(e=>[...new Set(e)]))
    .pipe(combineLatestWith(this.filterForm.controls['capacity'].valueChanges.pipe(startWith(''))),
      map(([capacities,filter])=>capacities.filter((capacity)=>capacity!=filter)));
    
    this.suggestionType$=this._hardDriveService.hardDriveFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.type)}),
          map(e=>[...new Set(e)]))
    .pipe(combineLatestWith(this.filterForm.controls['type'].valueChanges.pipe(startWith(''))),
      map(([types,filter])=>types.filter((type)=>type?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));

    this.suggestionCache$=this._hardDriveService.hardDriveFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.cache)}),
          map(e=>[...new Set(e)]))
    .pipe(combineLatestWith(this.filterForm.controls['cache'].valueChanges.pipe(startWith(''))),
      map(([caches,filter])=>caches.filter((cache)=>cache!=filter)));

      this.suggestionInterfaces$=this._hardDriveService.hardDriveFilter$
      .pipe(map(e=>{ return e.map(e2=>e2.interfaces)}),
            map(e=>[...new Set(e)]))
      .pipe(combineLatestWith(this.filterForm.controls['interfaces'].valueChanges.pipe(startWith(''))),
        map(([interfaces,filter])=>interfaces.filter((interface_)=>interface_?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));
  }
  bindProperty(value:string|number,property:string){
    this.filterForm.get(property)?.setValue(value);
  }
  resetFilter(){
    this.filterForm.reset();
    this.filterForm.controls['name'].patchValue('');
    this.filterForm.controls['capacity'].patchValue('');
    this.filterForm.controls['type'].patchValue('');
    this.filterForm.controls['cache'].patchValue('');
    this.filterForm.controls['interfaces'].patchValue('');
    this._hardDriveService.pagination.setQueryParams(true);
    this._hardDriveService.refreshHardDrives();
  }
  saveFilter(){
    let filter:HardDriveFilter={
      name:this.filterForm.value.name,
      capacity:this.filterForm.value.capacity,
      type:this.filterForm.value.type,
      cache:this.filterForm.value.cache,
      interfaces:this.filterForm.value.interfaces,
    }
    this.exit();
    this._hardDriveService.pagination.setQueryParams(false,filter);
    this._hardDriveService.refreshHardDrives();
  }
  exit(){
    this._popupSerive.clearPopup();
  }

}
