import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { GraphicsPost } from 'src/app/interfaces/graphics.model';
import { GraphicsService } from 'src/app/services/graphics.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-add-graphics',
  templateUrl: './add-graphics.component.html',
  styleUrls: ['./add-graphics.component.scss']
})
export class AddGraphicsComponent  extends PopupTemplateComponent implements OnInit{
  newForm!:FormGroup;
  data!:any;
  constructor(private _popupSerivce:PopupService,
    private _formBuilder:FormBuilder,
    private _graphicsService:GraphicsService,
    private _toastService:ToastrService){
    super();
  }
  ngOnInit(): void {
    this.newForm=this._formBuilder.group({
      name:[,Validators.required],
      imageUrl:[,Validators.required],
      chipset:[,Validators.required],
      memory:[,Validators.required],
      coreClock:[,Validators.required],
      boostClock:[,Validators.required],
      color:[,Validators.required],
      length:[,Validators.required],
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
    let body:GraphicsPost={
      name:this.newForm.value.name,
      imageUrl:this.newForm.value.imageUrl,
      chipset: this.newForm.value.chipset,
      memory:this.newForm.value.memory,
      coreClock:this.newForm.value.coreClock,
      boostClock:this.newForm.value.boostClock,
      color: this.newForm.value.color,
      length: this.newForm.value.length,
    }
    if(this.data!=undefined){
      this._graphicsService.editGraphics(body,this.data.id).subscribe({
        next:(res)=>{
          this._toastService.success('Edited part available','Edited successfully');
          this._graphicsService.refreshGraphics();
        },
        error:(err)=>{
          this._toastService.error('Something goes wrong','Operation failed');
        }
      })
    }else{
      this._graphicsService.addGraphics(body).subscribe({
        next:(res)=>{
          this._toastService.success('New part available','Added successfully');
          this._graphicsService.refreshGraphics();
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
