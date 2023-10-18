import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { Roles } from 'src/app/enums/roles';
import { categoryAdd } from 'src/app/interfaces/categoryAdd.model';
import { AccountService } from 'src/app/services/account.service';
import { CategoryService } from 'src/app/services/category.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent extends PopupTemplateComponent implements OnInit{
  categoryForm!:FormGroup;
  constructor(
    private _popupService:PopupService,
    private _accountService:AccountService,
    private _formBuilder:FormBuilder,
    private _categoryService:CategoryService,
    private _toastService:ToastrService){
    super();
  }
  ngOnInit(): void {
    this.isVisible=true;
    this.categoryForm=this._formBuilder.group({
      name:[,Validators.required],
      bgColor:[,Validators.required],
      color:[,Validators.required],
    })
  }
  addThreadCategory(form:FormGroupDirective,event:Event){
    form.onSubmit(event);
    if(!this.categoryForm.valid)return;
    let body:categoryAdd={
      name:this.categoryForm.value.name,
      bgColor:this.categoryForm.value.bgColor,
      color:this.categoryForm.value.color,
    }
    console.log(body);
    this._categoryService.addCategory(body).subscribe((res)=>{
      this.waiting=true;
      this._toastService.success(`Created `,'Thread category added successfully');
      this.waiting=false;
      this.exit();
    },(err)=>{
      console.log(err);
      this._toastService.error('','Operation failed');
      this.exit();
    })
    form.resetForm();

  }
  exit(){
    this._popupService.clearPopup();
  }
  get getUser(){
    return this._accountService.user.roleId==Roles.admin ? true:false;
   }
}
