import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, combineLatestWith, map, startWith } from 'rxjs';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { processorCoolerFilter } from 'src/app/interfaces/processorCoolerFilter.model';
import { PopupService } from 'src/app/services/popup.service';
import { ProcessorCoolerService } from 'src/app/services/processor-cooler.service';

@Component({
  selector: 'app-search-processor-cooler',
  templateUrl: './search-processor-cooler.component.html',
  styleUrls: ['./search-processor-cooler.component.scss']
})
export class SearchProcessorCoolerComponent extends PopupTemplateComponent implements OnInit{
  filterForm!:FormGroup;
  suggestionName$!:Observable<string[]>;
  suggestionRpmLower$!:Observable<number[]>;
  suggestionRpmUpper$!:Observable<number[]>;
  suggestionNoiseLower$!:Observable<number[]>;
  suggestionNoiseUpper$!:Observable<number[]>;
  suggestionSize$!:Observable<number[]>;
  constructor(
    private _popupSerive:PopupService,
    private _formBuilder:FormBuilder,
    private _processorCoolerService:ProcessorCoolerService){
    super();
  }
  ngOnInit(): void {
    this.filterForm=this._formBuilder.group({
      name:[],
      rpmLower:[],
      rpmUpper:[],
      noiseLower:[],
      noiseUpper:[],
      size:[],
    });
    this._processorCoolerService.pagination.getQueryParams.keys().forEach(e=>{
      if(this.filterForm.get(e)){
        this.filterForm.get(e)?.setValue(this._processorCoolerService.pagination.getQueryParams.get(e));
      }
    });
    this.suggestionName$=this._processorCoolerService.processorCoolerFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.name)}),
          map(e=>[...new Set(e)]))
    .pipe(combineLatestWith(this.filterForm.controls['name'].valueChanges.pipe(startWith(''))),
      map(([names,filter])=>names.filter((name)=>name?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));

    this.suggestionRpmLower$=this._processorCoolerService.processorCoolerFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.rpmLower)}),
          map(e=>[...new Set(e)]))
    .pipe(combineLatestWith(this.filterForm.controls['rpmLower'].valueChanges.pipe(startWith(''))),
      map(([rpms,filter])=>rpms.filter((rpm)=>rpm!=filter)));

    this.suggestionRpmUpper$=this._processorCoolerService.processorCoolerFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.rpmUpper)}),
          map(e=>[...new Set(e)]))
    .pipe(combineLatestWith(this.filterForm.controls['rpmUpper'].valueChanges.pipe(startWith(''))),
      map(([rpms,filter])=>rpms.filter((rpm)=>rpm!=filter)));

    this.suggestionNoiseLower$=this._processorCoolerService.processorCoolerFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.noiseLower)}),
          map(e=>[...new Set(e)]))
    .pipe(combineLatestWith(this.filterForm.controls['noiseLower'].valueChanges.pipe(startWith(''))),
      map(([noises,filter])=>noises.filter((noise)=>noise!=filter)));

    this.suggestionNoiseUpper$=this._processorCoolerService.processorCoolerFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.noiseUpper)}),
          map(e=>[...new Set(e)]))
    .pipe(combineLatestWith(this.filterForm.controls['noiseUpper'].valueChanges.pipe(startWith(''))),
      map(([noises,filter])=>noises.filter((noise)=>noise!=filter)));

    this.suggestionSize$=this._processorCoolerService.processorCoolerFilter$
      .pipe(map(e=>{ return e.map(e2=>e2.size)}),
            map(e=>[...new Set(e)]))
      .pipe(combineLatestWith(this.filterForm.controls['size'].valueChanges.pipe(startWith(''))),
        map(([sizes,filter])=>sizes.filter((size)=>size!=filter)));

  }
  bindProperty(value:string|number,property:string){
    this.filterForm.get(property)?.setValue(value);
  }
  resetFilter(){
    this.filterForm.reset();
    this.filterForm.controls['name'].patchValue('');
    this.filterForm.controls['rpmLower'].patchValue('');
    this.filterForm.controls['rpmUpper'].patchValue('');
    this.filterForm.controls['noiseLower'].patchValue('');
    this.filterForm.controls['noiseUpper'].patchValue('');
    this.filterForm.controls['size'].patchValue('');
    this._processorCoolerService.pagination.setQueryParams(true);
    this._processorCoolerService.refreshProcessorCooler();
  }
  saveFilter(){
    let filter:processorCoolerFilter={
      name:this.filterForm.value.name,
      rpmLower:this.filterForm.value.rpmLower,
      rpmUpper:this.filterForm.value.rpmUpper,
      noiseLower:this.filterForm.value.oiseLower,
      noiseUpper:this.filterForm.value.noiseUpper,
      size:this.filterForm.value.size,

    }
    this.exit();
    this._processorCoolerService.pagination.setQueryParams(false,filter);
    this._processorCoolerService.refreshProcessorCooler();
  }
  exit(){
    this._popupSerive.clearPopup();
  }

}
