import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { HardDrivePost } from 'src/app/interfaces/hard-drive.model';
import { HardDriveService } from 'src/app/services/hard-drive.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-add-hard-drive',
  templateUrl: './add-hard-drive.component.html',
  styleUrls: ['./add-hard-drive.component.scss']
})
export class AddHardDriveComponent extends PopupTemplateComponent implements OnInit{
  newForm!:FormGroup;
  data:any;
  constructor(private _popupSerivce:PopupService,
    private _formBuilder:FormBuilder,
    private _hardDriveService:HardDriveService,
    private _toastService:ToastrService){
    super();
  }
  ngOnInit(): void {
    this.newForm=this._formBuilder.group({
      name:[,Validators.required],
      imageUrl:[,Validators.required],
      capacity:[,Validators.required],
      type:[,Validators.required],
      cache:[,Validators.required],
      interfaces:[,Validators.required],
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
    let body:HardDrivePost={
      name:this.newForm.value.name,
      imageUrl:this.newForm.value.imageUrl,
      capacity: this.newForm.value.capacity,
      type: this.newForm.value.type,
      cache: this.newForm.value.cache,
      interfaces: this.newForm.value.interfaces,
    }
    if(this.data!=undefined){
      this._hardDriveService.editHardDrive(body,this.data.id).subscribe({
        next:(res)=>{
          this._toastService.success('Edited part available','Edited successfully');
          this._hardDriveService.refreshHardDrives();
        },
        error:(err)=>{
          this._toastService.error('Something goes wrong','Operation failed');
        }
      })
    }else{
      this._hardDriveService.addHardDrive(body).subscribe({
        next:(res)=>{
          this._toastService.success('New part available','Added successfully');
          this._hardDriveService.refreshHardDrives();
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
