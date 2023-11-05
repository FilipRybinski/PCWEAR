import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, combineLatestWith, map, startWith } from 'rxjs';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { GraphicsFilter } from 'src/app/interfaces/graphicsFilter.model';
import { GraphicsService } from 'src/app/services/graphics.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-search-graphics',
  templateUrl: './search-graphics.component.html',
  styleUrls: ['./search-graphics.component.scss']
})
export class SearchGraphicsComponent extends PopupTemplateComponent implements OnInit{
  filterForm!:FormGroup;
  suggestionName$!:Observable<string[]>;
  suggestionChipset$!:Observable<string[]>;
  suggestionMemory$!:Observable<number[]>;
  suggestionCoreClock$!:Observable<number[]>;
  suggestionBoostClock$!:Observable<number[]>;
  suggestionColor$!:Observable<string[]>;
  suggestionLength$!:Observable<number[]>;
  constructor(
    private _popupSerive:PopupService,
    private _formBuilder:FormBuilder,
    private _graphicsService:GraphicsService){
    super();
  }
  ngOnInit(): void {
    this.filterForm=this._formBuilder.group({
      name:[],
      chipset:[],
      memory:[],
      coreClock:[],
      boostClock:[],
      color:[],
      length:[]
    });
    this._graphicsService.pagination.getQueryParams.keys().forEach(e=>{
      if(this.filterForm.get(e)){
        this.filterForm.get(e)?.setValue(this._graphicsService.pagination.getQueryParams.get(e));
      }
    });
    this.suggestionName$=this._graphicsService.graphicsFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.name)}),
          map(e=>[...new Set(e)]))
    .pipe(combineLatestWith(this.filterForm.controls['name'].valueChanges.pipe(startWith(''))),
      map(([names,filter])=>names.filter((name)=>name?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));
      
      this.suggestionChipset$=this._graphicsService.graphicsFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.chipset)}),
          map(e=>[...new Set(e)]))
    .pipe(combineLatestWith(this.filterForm.controls['chipset'].valueChanges.pipe(startWith(''))),
      map(([chipsets,filter])=>chipsets.filter((chipset)=>chipset?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));

      this.suggestionMemory$=this._graphicsService.graphicsFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.memory)}),
          map(e=>[...new Set(e)]))
    .pipe(combineLatestWith(this.filterForm.controls['memory'].valueChanges.pipe(startWith(''))),
      map(([memories,filter])=>memories.filter((memory)=>memory!=filter)));

      this.suggestionCoreClock$=this._graphicsService.graphicsFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.coreClock)}),
          map(e=>[...new Set(e)]))
    .pipe(combineLatestWith(this.filterForm.controls['coreClock'].valueChanges.pipe(startWith(''))),
      map(([clocks,filter])=>clocks.filter((clock)=>clock!=filter)));

      this.suggestionBoostClock$=this._graphicsService.graphicsFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.boostClock)}),
          map(e=>[...new Set(e)]))
    .pipe(combineLatestWith(this.filterForm.controls['boostClock'].valueChanges.pipe(startWith(''))),
      map(([clocks,filter])=>clocks.filter((clock)=>clock!=filter)));

      this.suggestionColor$=this._graphicsService.graphicsFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.color)}),
          map(e=>[...new Set(e)]))
    .pipe(combineLatestWith(this.filterForm.controls['color'].valueChanges.pipe(startWith(''))),
      map(([colors,filter])=>colors.filter((color)=>color?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));

      this.suggestionLength$=this._graphicsService.graphicsFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.length)}),
          map(e=>[...new Set(e)]))
    .pipe(combineLatestWith(this.filterForm.controls['length'].valueChanges.pipe(startWith(''))),
      map(([lengths,filter])=>lengths.filter((length)=>length!=filter)));
  }
  bindProperty(value:string|number,property:string){
    this.filterForm.get(property)?.setValue(value);
  }
  resetFilter(){
    this.filterForm.reset();
    this.filterForm.controls['name'].patchValue('');
    this.filterForm.controls['chipset'].patchValue('');
    this.filterForm.controls['memory'].patchValue('');
    this.filterForm.controls['coreClock'].patchValue('');
    this.filterForm.controls['boostClock'].patchValue('');
    this.filterForm.controls['color'].patchValue('');
    this.filterForm.controls['length'].patchValue('');
    this._graphicsService.pagination.setQueryParams(true);
    this._graphicsService.refreshGraphics();
  }
  saveFilter(){
    let filter:GraphicsFilter={
      name:this.filterForm.value.name,
      chipset:this.filterForm.value.chipset,
      memory:this.filterForm.value.memory,
      coreClock:this.filterForm.value.coreClock,
      boostClock:this.filterForm.value.boostClock,
      color:this.filterForm.value.color,
      length:this.filterForm.value.length,

    }
    this.exit();
    this._graphicsService.pagination.setQueryParams(false,filter);
    this._graphicsService.refreshGraphics();
  }
  exit(){
    this._popupSerive.clearPopup();
  }

}
