import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, combineLatestWith, map, startWith } from 'rxjs';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { PostFilter } from 'src/app/interfaces/postFilter.model';
import { PopupService } from 'src/app/services/popup.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.scss']
})
export class SearchPostComponent extends PopupTemplateComponent implements OnInit{
  filterForm!:FormGroup;
  suggestionUserName$!:Observable<string[]>;
  suggestionTitle$!:Observable<string[]>;
  constructor(
    private _popupSerive:PopupService,
    private _formBuilder:FormBuilder,
    private _postService:PostService){
    super();
  }
  ngOnInit(): void {
    this.filterForm=this._formBuilder.group({
      userName:[],
      title:[]
    })
    this._postService.pagination.getQueryParams.keys().forEach(e=>{
      if(this.filterForm.get(e)){
        this.filterForm.get(e)?.setValue(this._postService.pagination.getQueryParams.get(e));
      }
    });
    this.suggestionTitle$=this._postService.postFilter$
      .pipe(map(e=>{ return e.map(e2=>e2.title)}),
            map(e=>[...new Set(e)]))
      .pipe(combineLatestWith(this.filterForm.controls['title'].valueChanges.pipe(startWith(''))),
        map(([titles,filter])=>titles.filter((tilte)=>tilte?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));
    
    this.suggestionUserName$=this._postService.postFilter$
    .pipe(map(e=>{ return e.map(e2=>e2.user)}),
          map(e=>[...new Set(e)]))
    .pipe(combineLatestWith(this.filterForm.controls['userName'].valueChanges.pipe(startWith(''))),
      map(([users,filter])=>users.filter((user)=>user?.toLocaleLowerCase().indexOf(filter?.toLocaleLowerCase())!=-1)));

  }
  bindProperty(value:string|number,property:string){
    this.filterForm.get(property)?.setValue(value);
  }
  resetFilter(){
    this.filterForm.reset();
    this.filterForm.controls['userName'].patchValue('');
    this.filterForm.controls['title'].patchValue('');
    this._postService.pagination.setQueryParams(true);
    this._postService.refreshPosts();
  }
  saveFilter(){
    let filter:PostFilter={
      userName:this.filterForm.value.userName,
      title:this.filterForm.value.title,
    }
    this.exit();
    this._postService.pagination.setQueryParams(false,filter);
    this._postService.refreshPosts();
  }
  exit(){
    this._popupSerive.clearPopup();
  }

}
