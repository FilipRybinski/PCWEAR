import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { Assessment } from 'src/app/interfaces/assessment.model';
import { ComponentsService } from 'src/app/services/components.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-assess-part',
  templateUrl: './assess-part.component.html',
  styleUrls: ['./assess-part.component.scss']
})
export class AssessPartComponent extends PopupTemplateComponent implements OnInit {
  assessment!:number;
  assessmentForm!:FormGroup;
  data:any; // partId
  constructor(
    private _popupService:PopupService,
    private _formBuilder:FormBuilder,
    private _componentsService:ComponentsService,
    private _toastSerive:ToastrService
    ){
    super();
  }
  ngOnInit(): void {
    console.log(this.data);
    this.assessmentForm=this._formBuilder.group({
      assessmentNumber:[,Validators.required],
      comment:[,Validators.required],
    })
  }
  addAssessment(form:FormGroupDirective,event:Event){
    form.onSubmit(event);
    if(!this.assessmentForm.valid)return;
    let body:Assessment={
      partId:this.data.partId,
      comment:this.assessmentForm.value.comment,
      rating:this.assessmentForm.value.assessmentNumber
    }
    this._componentsService.addAssessment(body).subscribe(
      {
        next:(res)=>{
          this._toastSerive.success(`Successfully added new assessment`, `${this.data.name}`);
          this.exit();
          this._componentsService.refreshParts();
        },
        error:(err)=>{
          this._toastSerive.success(err.error.Message, err.error.Code);
        }
      })

  }
  handleAssess(value:number){
    this.assessmentForm.controls['assessmentNumber'].patchValue(value);
  }
  exit(){
    this._popupService.clearPopup();
  }
}
