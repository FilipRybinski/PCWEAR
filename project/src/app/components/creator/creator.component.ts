import { Component, OnInit } from '@angular/core';
import { Case } from 'src/app/interfaces/case.model';
import { Graphics } from 'src/app/interfaces/graphics.model';
import { HardDrive } from 'src/app/interfaces/hard-drive.model';
import { Memory } from 'src/app/interfaces/memory.model';
import { Motherboard } from 'src/app/interfaces/motherboard.model';
import { PowerSupply } from 'src/app/interfaces/powerSupply.model';
import { Processor } from 'src/app/interfaces/processor.model';
import { processorCooler } from 'src/app/interfaces/processorCooler.model';
import { bounceInLeftOnEnterAnimation,bounceOutLeftOnLeaveAnimation,fadeInOnEnterAnimation,fadeOutOnLeaveAnimation} from 'angular-animations';
import { PopupService } from 'src/app/services/popup.service';
import { RecommendedService } from 'src/app/services/recommended.service';


@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss'],
  animations:[bounceInLeftOnEnterAnimation(),bounceOutLeftOnLeaveAnimation(), fadeInOnEnterAnimation()]
})
export class CreatorComponent implements OnInit{
  processor?:Processor;
  motherboard?:Motherboard;
  memory?:Memory;
  powerSupply?:PowerSupply;
  case?:Case;
  graphics?:Graphics;
  hardDrive?:HardDrive;
  processorCooler?:processorCooler;
  selectArray:string[]=['motherboard','processor','hard-drive','case','processor-cooler','memory','power-supply','graphics']
  selectedType!:string;
  constructor(
    private _popupService:PopupService,
    private _recommendedService:RecommendedService
  ){}
  ngOnInit(): void {
    this.bindType();
  }
  openPopup(name:string){
    this._popupService.openPopup(name,{});
  }
  bindType(){
    this.selectedType=this.selectArray[0];
  }
  bindProperty(part:any,name:string,flag:boolean){
    switch (name){
      case 'processor':
        if(flag){
          this.processor=part
          this.selectArray=this.selectArray.filter(e=>e!=name);
        }else{
          this.processor=undefined;
          this.selectArray.push(name);
        } 
        break;
      case 'graphics':
        if(flag){
          this.graphics=part
          this.selectArray=this.selectArray.filter(e=>e!=name);
        }else{
          this.graphics=undefined;
           this.selectArray.push(name);
        } 
        break;
      case 'motherboard':
        if(flag){
          console.log("x")
          this.motherboard=part;
          console.log(this.motherboard)
          this.selectArray=this.selectArray.filter(e=>e!=name);
        }else{
          this.motherboard=undefined;
           this.selectArray.push(name);
        } 
        break;
      case 'hard-drive':
        if(flag){
          this.hardDrive=part
          this.selectArray=this.selectArray.filter(e=>e!=name);
        }else{
          this.hardDrive=undefined;
          this.selectArray.push(name);
        } 
        break;
      case 'case':
        if(flag){
          this.case=part
          this.selectArray=this.selectArray.filter(e=>e!=name);
        }else{
          this.case=undefined;
          this.selectArray.push(name);
        } 
        break;
      case 'processor-cooler':
        if(flag){
          this.processorCooler=part
          this.selectArray=this.selectArray.filter(e=>e!=name);
        }else{
          this.processorCooler=undefined;
          this.selectArray.push(name);
        } 
        break;
      case 'memory':
        if(flag){
          this.memory=part
          this.selectArray=this.selectArray.filter(e=>e!=name);
        }else{
          this.memory=undefined;
          this.selectArray.push(name);
        } 
        break;
      case 'power-supply':
        if(flag){
          this.powerSupply=part
          this.selectArray=this.selectArray.filter(e=>e!=name);
        }else{
          this.powerSupply=undefined;
          this.selectArray.push(name);
        } 
        break;
    }
    this.bindType();
  }
  addSet(){
    let array=[this.processor?.id,this.graphics?.id,this.motherboard?.id,this.memory?.id,this.powerSupply?.id,this.case?.id,this.hardDrive?.id];
    this._recommendedService.addRecommended(array).subscribe((res)=>{
      console.log(res)
    },(err)=>{
      console.log(err);
    })
  }
}
