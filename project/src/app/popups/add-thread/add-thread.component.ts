import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { category } from 'src/app/interfaces/category.model';
import { AccountService } from 'src/app/services/account.service';
import { PopupService } from 'src/app/services/popup.service';
import { ThreadService } from 'src/app/services/thread.service';
import { threadAdd } from 'src/app/interfaces/threadAdd.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-thread',
  templateUrl: './add-thread.component.html',
  styleUrls: ['./add-thread.component.scss']
})
export class AddThreadComponent extends PopupTemplateComponent implements OnInit{
  threadForm!:FormGroup;
  category$!:Observable<category[]>;
  selectedCategoryArray:category[]=[];
  constructor(
    private _popupService:PopupService,
    private _accountService:AccountService,
    private _formBuilder:FormBuilder,
    private _threadService:ThreadService,
    private _categoryService:CategoryService,
    private _toastService:ToastrService
    ){
    super();
  }
  ngOnInit(): void {
    this.isVisible=true;
    this.threadForm=this._formBuilder.group({
      title:[,Validators.required],
      description:[,Validators.required]
    })
    this.category$=this._categoryService.getCategories();
  }
  addThread(form:FormGroupDirective,event:Event){
    form.onSubmit(event);
    if(!this.threadForm.valid && this.selectedCategoryArray.length==0)return;
    let body:threadAdd={
      title:this.threadForm.value.title,
      description:this.threadForm.value.description,
      categories:this.selectedCategoryArray.map(c=>{return {name:c.name,color:c.color,bgColor:c.bgColor}})
    }
    this._threadService.addThread(body).subscribe((res)=>{
      this.waiting=true;
      this._toastService.success('Thread added successfully','Created');
      this.waiting=false;
      this._threadService.refreshThreads();
      this.exit();
    },(err)=>{
      console.log(err);
      this._toastService.error(err.error.Message,`Operation failed ${err.error.Code}`);
      this.exit();
    })
    form.resetForm();

  }
  saveCategory(category:category[]){
    this.selectedCategoryArray=category;
  }
  exit(){
    this._popupService.clearPopup();
  }
  get getUser(){
   return this._accountService.user ? true:false;
  }
}
