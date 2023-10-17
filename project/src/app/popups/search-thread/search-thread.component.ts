import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, combineLatestWith, map, share, startWith } from 'rxjs';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { category } from 'src/app/interfaces/category.model';
import { threadFilter } from 'src/app/interfaces/threadFilter.model';
import { CategoryService } from 'src/app/services/category.service';
import { PopupService } from 'src/app/services/popup.service';
import { ThreadService } from 'src/app/services/thread.service';

@Component({
  selector: 'app-search-thread',
  templateUrl: './search-thread.component.html',
  styleUrls: ['./search-thread.component.scss']
})
export class SearchThreadComponent extends PopupTemplateComponent implements OnInit{
  filterForm!:FormGroup;
  category$!:Observable<category[]>;
  threadTitles$!:Observable<string[]>;
  threadDescription$!:Observable<string[]>;
  selectedCategoryArray:category[]=[];
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
      }else{
        const lastSearched=this._threadService.queryParamsFitler.get(e)?.split(',');
        this._categoryService.getCategories().pipe(map(e=>e.filter(e2=>lastSearched?.includes(e2.name)))).subscribe(
          {next: (res)=>this.selectedCategoryArray=res,
          error: (err)=>console.log(err)
          })
      }
    });
    this.category$=this._categoryService.getCategories();
    this.threadTitles$=this._threadService.threadFilter$
    .pipe(map(e=>{return e.map(e2=>e2.title)}))
      .pipe(combineLatestWith(this.filterForm.controls['title'].valueChanges.pipe(startWith(''))),
        map(([titles,filter])=>titles.filter((title)=>title?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));
    
    this.threadDescription$=this._threadService.threadFilter$
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
    this.exit();
    this._threadService.setQueryParams(false,filter);
  }
  resetFilter(){
    this.filterForm.reset();
    this.filterForm.controls['title'].patchValue('');
    this.filterForm.controls['description'].patchValue('');
    this.selectedCategoryArray=[];
    this._threadService.setQueryParams(true);
  }
  exit(){
    this._popupService.clearPopup();
  }
  saveCategory(category:category[]){
    this.selectedCategoryArray=category;
  }
}
