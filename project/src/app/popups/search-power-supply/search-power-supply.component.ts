import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, combineLatestWith, map, startWith } from 'rxjs';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { powerSupplyFilter } from 'src/app/interfaces/powerSupplyFilter.model';
import { PopupService } from 'src/app/services/popup.service';
import { PowerSupplyService } from 'src/app/services/power-supply.service';

@Component({
  selector: 'app-search-power-supply',
  templateUrl: './search-power-supply.component.html',
  styleUrls: ['./search-power-supply.component.scss']
})
export class SearchPowerSupplyComponent extends PopupTemplateComponent implements OnInit{
  filterForm!:FormGroup;
  suggestionName$!:Observable<string[]>;
  suggestionType$!:Observable<string[]>;
  suggestionEfficiency$!:Observable<string[]>;
  suggestionWattage$!:Observable<number[]>;
  suggestionModular$!:Observable<string[]>;
  suggestionColor$!:Observable<string[]>;
  constructor(
    private _popupSerive:PopupService,
    private _formBuilder:FormBuilder,
    private _powerSupplyService:PowerSupplyService
    ){
    super();
  }
  ngOnInit(): void {
    this.filterForm=this._formBuilder.group({
      name:[],
      type:[],
      efficiency:[],
      wattage:[],
      modular:[],
      color:[],
    });
    this._powerSupplyService.pagination.getQueryParams.keys().forEach(e=>{
      if(this.filterForm.get(e)){
        this.filterForm.get(e)?.setValue(this._powerSupplyService.pagination.getQueryParams.get(e));
      }
    });
    this.suggestionName$=this._powerSupplyService.powerSupplyFilter$
      .pipe(map(e=>{ return e.map(e2=>e2.name)}))
      .pipe(combineLatestWith(this.filterForm.controls['name'].valueChanges.pipe(startWith(''))),
        map(([names,filter])=>names.filter((name)=>name?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));

    this.suggestionType$=this._powerSupplyService.powerSupplyFilter$
      .pipe(map(e=>{ return e.map(e2=>e2.type)}))
      .pipe(combineLatestWith(this.filterForm.controls['type'].valueChanges.pipe(startWith(''))),
        map(([types,filter])=>types.filter((type)=>type?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));

    this.suggestionEfficiency$=this._powerSupplyService.powerSupplyFilter$
      .pipe(map(e=>{ return e.map(e2=>e2.efficiency)}))
      .pipe(combineLatestWith(this.filterForm.controls['type'].valueChanges.pipe(startWith(''))),
        map(([efficiencies,filter])=>efficiencies.filter((efficiency)=>efficiency?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));

    this.suggestionWattage$=this._powerSupplyService.powerSupplyFilter$
      .pipe(map(e=>{ return e.map(e2=>e2.wattage)}))
      .pipe(combineLatestWith(this.filterForm.controls['wattage'].valueChanges.pipe(startWith(''))),
        map(([wattages,filter])=>wattages.filter((wattage)=>wattage!=filter)));

    this.suggestionModular$=this._powerSupplyService.powerSupplyFilter$
      .pipe(map(e=>{ return e.map(e2=>e2.modular)}))
      .pipe(combineLatestWith(this.filterForm.controls['modular'].valueChanges.pipe(startWith(''))),
        map(([modulars,filter])=>modulars.filter((modular)=>modular?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));

    this.suggestionColor$=this._powerSupplyService.powerSupplyFilter$
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
    this.filterForm.controls['type'].patchValue('');
    this.filterForm.controls['efficiency'].patchValue('');
    this.filterForm.controls['wattage'].patchValue('');
    this.filterForm.controls['modular'].patchValue('');
    this.filterForm.controls['color'].patchValue('');
    this._powerSupplyService.pagination.setQueryParams(true);
    this._powerSupplyService.refreshPowerSupply();
  }
  saveFilter(){
    let filter:powerSupplyFilter={
      name:this.filterForm.value.name,
      type:this.filterForm.value.type,
      efficiency:this.filterForm.value.efficiency,
      wattage:this.filterForm.value.wattage,
      modular:this.filterForm.value.modular,
      color:this.filterForm.value.color,

    }
    this.exit();
    this._powerSupplyService.pagination.setQueryParams(false,filter);
    this._powerSupplyService.refreshPowerSupply();
  }
  exit(){
    this._popupSerive.clearPopup();
  }

}
