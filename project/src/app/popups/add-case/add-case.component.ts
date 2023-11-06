import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { CasePost } from 'src/app/interfaces/case.model';
import { CaseService } from 'src/app/services/case.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.scss']
})
export class AddCaseComponent  extends PopupTemplateComponent implements OnInit{
  newForm!:FormGroup;
  data!:any;
  constructor(private _popupSerivce:PopupService,
    private _formBuilder:FormBuilder,
    private _caseService:CaseService,
    private _toastService:ToastrService){
    super();
  }
  ngOnInit(): void {
    this.newForm=this._formBuilder.group({
      name:[,Validators.required],
      imageUrl:[,Validators.required],
      type:[,Validators.required],
      color:[,Validators.required],
      sidePanel:[,Validators.required],
      externalVolume:[,Validators.required],
    })
    if(this.data!=undefined){
      Object.keys(this.data).forEach(e=>{
        if(this.newForm.get(e)){
          this.newForm.get(e)?.setValue(this.data[e]);
        }
      })
    }
  }
  save(form:FormGroupDirective,event:Event){
    form.onSubmit(event);
    if(!this.newForm.valid)return;
    let body:CasePost={
      name:this.newForm.value.name,
      imageUrl:this.newForm.value.imageUrl,
      type: this.newForm.value.type,
      color: this.newForm.value.color,
      sidePanel: this.newForm.value.sidePanel,
      externalVolume: this.newForm.value.externalVolume,
    }
    if(this.data!=undefined){
      this._caseService.editCase(body,this.data.id).subscribe({
        next:(res)=>{
          this._toastService.success('Edited part available','Edited successfully');
          this._caseService.refreshCases();
        },
        error:(err)=>{
          this._toastService.error('Something goes wrong','Operation failed');
        }
      })
    }else{
      this._caseService.addCase(body).subscribe({
        next:(res)=>{
          this._toastService.success('New part available','Added successfully');
          this._caseService.refreshCases();
        },
        error:(err)=>{
          this._toastService.error('Something goes wrong','Operation failed');
        }
      })
    }
    this.exit();
  }
  exit(){
    this._popupSerivce.clearPopup();
  }


}
