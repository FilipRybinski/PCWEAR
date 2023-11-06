import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { processorCoolerPost } from 'src/app/interfaces/processorCooler.model';
import { PopupService } from 'src/app/services/popup.service';
import { ProcessorCoolerService } from 'src/app/services/processor-cooler.service';

@Component({
  selector: 'app-add-processor-cooler',
  templateUrl: './add-processor-cooler.component.html',
  styleUrls: ['./add-processor-cooler.component.scss']
})
export class AddProcessorCoolerComponent  extends PopupTemplateComponent implements OnInit{
  newForm!:FormGroup;
  data!:any;
  constructor(
    private _popupSerivce:PopupService,
    private _formBuilder:FormBuilder,
    private _processorCoolerService:ProcessorCoolerService,
    private _toastService:ToastrService){
    super();
  }
  ngOnInit(): void {
    this.newForm=this._formBuilder.group({
      name:[,Validators.required],
      imageUrl:[,Validators.required],
      rpmLower:[,Validators.required],
      rpmUpper:[,Validators.required],
      noiseLower:[,Validators.required],
      noiseUpper:[,Validators.required],
      size:[,Validators.required],
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
    let body:processorCoolerPost={
      name:this.newForm.value.name,
      imageUrl:this.newForm.value.imageUrl,
      rpmLower: this.newForm.value.rpmLower,
      rpmUpper: this.newForm.value.rpmUpper,
      noiseLower: this.newForm.value.noiseLower,
      noiseUpper: this.newForm.value.noiseUpper,
      size:this.newForm.value.size,
    }
    if(this.data!=undefined){
      this._processorCoolerService.editProcessorCooler(body,this.data.id).subscribe({
        next:(res)=>{
          this._toastService.success('Edited part available','Edited successfully');
          this._processorCoolerService.refreshProcessorCooler();
        },
        error:(err)=>{
          this._toastService.error('Something goes wrong','Operation failed');
        }
      })
    }else{
      this._processorCoolerService.addProcessorCooler(body).subscribe({
        next:(res)=>{
          this._toastService.success('New part available','Added successfully');
          this._processorCoolerService.refreshProcessorCooler();
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
