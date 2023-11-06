import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { MemoryPost } from 'src/app/interfaces/memory.model';
import { MemoryService } from 'src/app/services/memory.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-add-memory',
  templateUrl: './add-memory.component.html',
  styleUrls: ['./add-memory.component.scss']
})
export class AddMemoryComponent  extends PopupTemplateComponent implements OnInit{
  newForm!:FormGroup;
  data!:any;
  constructor(private _popupSerivce:PopupService,
    private _formBuilder:FormBuilder,
    private _memoryService:MemoryService,
    private _toastService:ToastrService){
    super();
  }
  ngOnInit(): void {
    this.newForm=this._formBuilder.group({
      name:[,Validators.required],
      imageUrl:[,Validators.required],
      speed:[,Validators.required],
      modulesLower:[,Validators.required],
      modulesUpper:[,Validators.required],
      color:[,Validators.required],
      cl:[,Validators.required],
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
    let body:MemoryPost={
      name:this.newForm.value.name,
      imageUrl:this.newForm.value.imageUrl,
      speed: this.newForm.value.speed,
      modulesLower: this.newForm.value.modulesLower,
      modulesUpper: this.newForm.value.modulesUpper,
      color:this.newForm.value.color,
      cl:this.newForm.value.cl,
    }
    if(this.data!=undefined){
      this._memoryService.editMemory(body,this.data.id).subscribe({
        next:(res)=>{
          this._toastService.success('Edited part available','Edited successfully');
          this._memoryService.refreshMemories();
        },
        error:(err)=>{
          this._toastService.error('Something goes wrong','Operation failed');
        }
      })
    }else{
      this._memoryService.addMemory(body).subscribe({
        next:(res)=>{
          this._toastService.success('New part available','Added successfully');
          this._memoryService.refreshMemories();
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
