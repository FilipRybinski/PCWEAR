import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, combineLatestWith, map, startWith } from 'rxjs';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { category } from 'src/app/interfaces/category.model';
import { threadFilter } from 'src/app/interfaces/threadFilter.model';
import { CategoryService } from 'src/app/services/category.service';
import { PopupService } from 'src/app/services/popup.service';
import { ThreadService } from 'src/app/services/thread.service';
import {bounceInOnEnterAnimation,bounceOutOnLeaveAnimation} from 'angular-animations';

@Component({
  selector: 'app-search-thread',
  templateUrl: './search-thread.component.html',
  styleUrls: ['./search-thread.component.scss'],
  animations:[
    bounceInOnEnterAnimation({ duration: 300, delay: 100}),
    bounceOutOnLeaveAnimation({ duration: 300, delay: 0}),
  ]
})
export class SearchThreadComponent extends PopupTemplateComponent implements OnInit{
  filterForm!:FormGroup;
  category$!:Observable<category[]>;
  threadTitles$!:Observable<string[]>;
  threadDescription$!:Observable<string[]>;
  selectedCategoryArray:category[]=[];
  isOpen:boolean=false;
  @ViewChild('field') filed!:ElementRef;
  constructor(
    private _popupService:PopupService,
    private _formBuilder:FormBuilder,
    private _threadService:ThreadService,
    private _categoryService:CategoryService){
    super();
  }
  ngOnInit(): void {
    this.isVisible=true;
    this.filterForm=this._formBuilder.group({
      title:[],
      description:[],
    })
    this._threadService.queryParamsFitler.keys().forEach(e=>{
      if(this.filterForm.get(e)){
        this.filterForm.get(e)?.setValue(this._threadService.queryParamsFitler.get(e));
      }
      if(e=='category'){
        const lastSearched=this._threadService.queryParamsFitler.get(e)?.split(',');
        this._categoryService.getCategories().pipe(map(e=>e.filter(e2=>lastSearched?.includes(e2.name)))).subscribe(
          {next: (res)=>this.selectedCategoryArray=res,
          error: (err)=>console.log(err)
          })
      }
    });
    this.category$=this._categoryService.getCategories();
    this.threadTitles$=this._threadService.threads$
    .pipe(map(e=>{return e.map(e2=>e2.title)}))
      .pipe(
        combineLatestWith(this.filterForm.controls['title'].valueChanges.pipe(startWith(''))),
        map(([titles,filter])=>titles.filter((title)=>title?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));
    this.threadDescription$=this._threadService.threads$
    .pipe(map(e=>{return e.map(e2=>e2.description)}))
      .pipe(combineLatestWith(this.filterForm.controls['description'].valueChanges.pipe(startWith(''))),
        map(([descriptions,filter])=>descriptions.filter((description)=>description?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));
  }
  bindProperty(value:string,property:string){
    this.filterForm.get(property)?.setValue(value);
  }
  saveFilter(){
    let filter:threadFilter={
      title:this.filterForm.value.title,
      description:this.filterForm.value.description,
      category:this.selectedCategoryArray.length>0 ? this.selectedCategoryArray.map(e=>e.name) : undefined
    }
   this._threadService.setQueryParams(false,filter);
   this.exit();
  }
  resetFilter(){
    this.filterForm.reset();
    this.selectedCategoryArray=[];
    this._threadService.setQueryParams(true);
  }
  exit(){
    this._popupService.clearPopup();
  }
  selectedCategory(category:category){
    let maped=this.selectedCategoryArray.map(c=>c.id);
    if(maped.includes(category.id)){
      this.selectedCategoryArray=this.selectedCategoryArray.filter(t=>t.id!=category.id);
    }else{
      this.selectedCategoryArray.push(category);
    }
  }
  toggleOpen(event:Event){
    if(event.target==this.filed.nativeElement) this.isOpen=!this.isOpen;
  }
}
