import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { AccountService } from 'src/app/services/account.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-edit-user-informations',
  templateUrl: './edit-user-informations.component.html',
  styleUrls: ['./edit-user-informations.component.scss']
})
export class EditUserInformationsComponent extends PopupTemplateComponent implements OnInit{
  editForm!:FormGroup;
  data!:any;
  constructor(
    private _popupService:PopupService,
    private _accountService:AccountService,
    private _formBuilder:FormBuilder,
    private _toastService:ToastrService){
    super();
  }
  ngOnInit(): void {
    this.editForm=this._formBuilder.group({
      editValue:[,Validators.required,,this.matchValidator('editValue',true)],
      confirmedEditedValue:[,Validators.compose([Validators.required,,this.matchValidator('editValue')])]
    })
  }
  exit(){
    this._popupService.clearPopup();
  }
  Save(form:FormGroupDirective,event:Event){
    form.onSubmit(event);
    if(!this.editForm.valid) return;
    let body={
      name:this.data.name,
      value:this.editForm.value.editValue
    }
    this._accountService.editUser(body).subscribe((res)=>{
      this._accountService.currentLoggedUser=res;
      this._toastService.success(`Introduced value ${this.editForm.value.editValue}`,'Successfully changed')
      this.exit();
    },(err)=>{
      console.log(err);
    })
  }
  matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent &&
        !!control.parent.value &&
        control.value === (control.parent?.controls as any)[matchTo].value
        ? null
        : { matching: true };
    };
  }
}
