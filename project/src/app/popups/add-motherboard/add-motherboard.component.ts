import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { MotherboardPost } from 'src/app/interfaces/motherboard.model';
import { MotherboardService } from 'src/app/services/motherboard.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-add-motherboard',
  templateUrl: './add-motherboard.component.html',
  styleUrls: ['./add-motherboard.component.scss']
})
export class AddMotherboardComponent  extends PopupTemplateComponent implements OnInit{
  newForm!:FormGroup;
  data!:any;
  constructor(private _popupSerivce:PopupService,
    private _formBuilder:FormBuilder,
    private _motherboardSerivce:MotherboardService,
    private _toastService:ToastrService
    ){
    super();
  }
  ngOnInit(): void {
    this.newForm=this._formBuilder.group({
      name:[,Validators.required],
      imageUrl:[,Validators.required],
      socket:[,Validators.required],
      formFactor:[,Validators.required],
      maxMemory:[,Validators.required],
      memorySlot:[,Validators.required],
      color:[,Validators.required],
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
    let body:MotherboardPost={
      name:this.newForm.value.name,
      imageUrl:this.newForm.value.imageUrl,
      socket:this.newForm.value.socket,
      formFactor:this.newForm.value.formFactor,
      maxMemory:this.newForm.value.maxMemory,
      memorySlot:this.newForm.value.memorySlot,
      color:this.newForm.value.color,
    }
    if(this.data!=undefined){
      this._motherboardSerivce.editMotherboard(body,this.data.id).subscribe({
        next:(res)=>{
          this._toastService.success('Edited part available','Edited successfully');
          this._motherboardSerivce.refreshMotherboards();
        },
        error:(err)=>{
          this._toastService.error('Something goes wrong','Operation failed');
        }
      })
    }else{
      this._motherboardSerivce.addMotherboard(body).subscribe({
        next:(res)=>{
          this._toastService.success('New part available','Added successfully');
          this._motherboardSerivce.refreshMotherboards();
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
