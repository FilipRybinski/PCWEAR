import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { Assessment } from 'src/app/interfaces/assessment.model';
import { CommentsService } from 'src/app/services/comments.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-assess-part',
  templateUrl: './assess-part.component.html',
  styleUrls: ['./assess-part.component.scss']
})
export class AssessPartComponent extends PopupTemplateComponent implements OnInit {
  assessmentForm!:FormGroup;
  alreadyAdded:boolean=false;
  data:any; // partId
  constructor(
    private _popupService:PopupService,
    private _formBuilder:FormBuilder,
    private _commentsService:CommentsService,
    private _toastSerive:ToastrService
    ){
    super();
  }
  ngOnInit(): void {
    this.assessmentForm=this._formBuilder.group({
      assessmentNumber:[,Validators.required],
      comment:[,Validators.required],
    })
    this._commentsService.checkAssessment(this.data.partId).subscribe(
      {
        next:(res)=>{
          if(!res) return;
          this.assessmentForm.controls['assessmentNumber'].patchValue(res.rating);
          this.assessmentForm.controls['comment'].patchValue(res.comment);
          this.alreadyAdded=true;
        }
      }
      )
  }
  addAssessment(form:FormGroupDirective,event:Event){
    form.onSubmit(event);
    if(!this.assessmentForm.valid)return;
    let body:Assessment={
      partId:this.data.partId,
      comment:this.assessmentForm.value.comment,
      rating:this.assessmentForm.value.assessmentNumber
    }
    if(this.alreadyAdded){
      this._commentsService.editAssessment(body).subscribe(
        {
          next:(res)=>{
            this._toastSerive.success(`Successfully edited assessment`, `${this.data.name}`);
            this.exit();
            window.location.reload();
          },
          error:(err)=>{
            this._toastSerive.success(err.error.Message, err.error.Code);
          }
        })
    }else{
      this._commentsService.addAssessment(body).subscribe(
        {
          next:(res)=>{
            this._toastSerive.success(`Successfully added new assessment`, `${this.data.name}`);
            this.exit();
            window.location.reload();
          },
          error:(err)=>{
            this._toastSerive.success(err.error.Message, err.error.Code);
          }
        })
    }
  }
  handleAssess(value:number){
    this.assessmentForm.controls['assessmentNumber'].patchValue(value);
  }
  exit(){
    this._popupService.clearPopup();
  }
}
