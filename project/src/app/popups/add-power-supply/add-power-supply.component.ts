import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { PowerSupplyPost } from 'src/app/interfaces/powerSupply.model';
import { PopupService } from 'src/app/services/popup.service';
import { PowerSupplyService } from 'src/app/services/power-supply.service';

@Component({
  selector: 'app-add-power-supply',
  templateUrl: './add-power-supply.component.html',
  styleUrls: ['./add-power-supply.component.scss']
})
export class AddPowerSupplyComponent  extends PopupTemplateComponent implements OnInit{
  newForm!:FormGroup;
  data!:any;
  constructor(
    private _popupSerivce:PopupService,
    private _formBuilder:FormBuilder,
    private _powerSupplySerivce:PowerSupplyService,
    private _toastService:ToastrService){
    super();
  }
  ngOnInit(): void {
    this.newForm=this._formBuilder.group({
      name:[,Validators.required],
      imageUrl:[,Validators.required],
      type:[,Validators.required],
      efficiency:[,Validators.required],
      wattage:[,Validators.required],
      modular:[,Validators.required],
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
    let body:PowerSupplyPost={
      name:this.newForm.value.name,
      imageUrl:this.newForm.value.imageUrl,
      type: this.newForm.value.type,
      efficiency: this.newForm.value.efficiency,
      wattage: this.newForm.value.wattage,
      modular: this.newForm.value.modular,
      color: this.newForm.value.color,
    }
    if(this.data!=undefined){
      this._powerSupplySerivce.editPowerSupply(body,this.data.id).subscribe({
        next:(res)=>{
          this._toastService.success('Edited part available','Edited successfully');
          this._powerSupplySerivce.refreshPowerSupply();
        },
        error:(err)=>{
          this._toastService.error('Something goes wrong','Operation failed');
        }
      })
    }else{
      this._powerSupplySerivce.addPowerSupply(body).subscribe({
        next:(res)=>{
          this._toastService.success('New part available','Added successfully');
          this._powerSupplySerivce.refreshPowerSupply();
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
