import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { ProcessorPost } from 'src/app/interfaces/processor.model';
import { PopupService } from 'src/app/services/popup.service';
import { ProcessorsService } from 'src/app/services/processors.service';

@Component({
  selector: 'app-add-processor',
  templateUrl: './add-processor.component.html',
  styleUrls: ['./add-processor.component.scss']
})
export class AddProcessorComponent  extends PopupTemplateComponent implements OnInit{
  newForm!:FormGroup;
  data!:any;
  constructor(
    private _popupSerivce:PopupService,
    private _formBuilder:FormBuilder,
    private _processorService:ProcessorsService,
    private _toastService:ToastrService){
    super();
  }
  ngOnInit(): void {
    this.newForm=this._formBuilder.group({
      name:[,Validators.required],
      imageUrl:[,Validators.required],
      cores:[,Validators.required],
      threads:[,Validators.required],
      tdp:[,Validators.required],
      graphics:[false],
      socket:[,Validators.required],
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
    let body:ProcessorPost={
      name:this.newForm.value.name,
      imageUrl:this.newForm.value.imageUrl,
      cores: this.newForm.value.cores,
      threads: this.newForm.value.threads,
      graphics: this.newForm.value.graphics,
      tdp: this.newForm.value.tdp,
      socket: this.newForm.value.socket,
    }
    if(this.data!=undefined){
      this._processorService.editProcessor(body,this.data.id).subscribe({
        next:(res)=>{
          this._toastService.success('Edited part available','Edited successfully');
          this._processorService.refreshProcessors();
        },
        error:(err)=>{
          this._toastService.error('Something goes wrong','Operation failed');
        }
      })
    }else{
      this._processorService.addProcessor(body).subscribe({
        next:(res)=>{
          this._toastService.success('New part available','Added successfully');
          this._processorService.refreshProcessors();
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
