import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Case } from 'src/app/interfaces/case.model';
import { Graphics } from 'src/app/interfaces/graphics.model';
import { HardDrive } from 'src/app/interfaces/hard-drive.model';
import { Memory } from 'src/app/interfaces/memory.model';
import { Motherboard } from 'src/app/interfaces/motherboard.model';
import { Part } from 'src/app/interfaces/part.model';
import { PowerSupply } from 'src/app/interfaces/powerSupply.model';
import { Processor } from 'src/app/interfaces/processor.model';
import { processorCooler } from 'src/app/interfaces/processorCooler.model';
import { CaseService } from 'src/app/services/case.service';
import { GraphicsService } from 'src/app/services/graphics.service';
import { HardDriveService } from 'src/app/services/hard-drive.service';
import { MemoryService } from 'src/app/services/memory.service';
import { MotherboardService } from 'src/app/services/motherboard.service';
import { PopupService } from 'src/app/services/popup.service';
import { PowerSupplyService } from 'src/app/services/power-supply.service';
import { ProcessorCoolerService } from 'src/app/services/processor-cooler.service';
import { ProcessorsService } from 'src/app/services/processors.service';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit{
  processors$!:Observable<Processor[]>;
  processor?:Processor;
  motherboards$!:Observable<Motherboard[]>;
  motherboard?:Motherboard;
  memories$!:Observable<Memory[]>;
  memory?:Memory;
  powerSupply$!:Observable<PowerSupply[]>;
  powerSupply?:PowerSupply;
  cases$!:Observable<Case[]>;
  case?:Case;
  graphics$!:Observable<Graphics[]>;
  graphics?:Graphics;
  hardDrives$!:Observable<HardDrive[]>;
  hardDrive?:HardDrive;
  processorCoolers$!:Observable<processorCooler[]>;
  processorCooler?:processorCooler;
  constructor(
    private _casesService:CaseService,
    private _graphicsService:GraphicsService,
    private _hardDrivesService:HardDriveService,
    private _memoriesSerivce:MemoryService,
    private _motherboardSerivce:MotherboardService,
    private _powerSupplyService:PowerSupplyService,
    private _processorCoolerService:ProcessorCoolerService,
    private _processorService:ProcessorsService,
    private _popupService:PopupService
  ){}
  ngOnInit(): void {
    this.processors$=this._processorService.processors$.pipe(tap(e=>this._processorService.processorsFilter$.next(e)));
    this.motherboards$=this._motherboardSerivce.motherboards$.pipe(tap(e=>this._motherboardSerivce.motherboardFilter$.next(e)));
    this.cases$=this._casesService.cases$.pipe(tap(e=>this._casesService.caseFilter$.next(e)));
    this.memories$=this._memoriesSerivce.memories$.pipe(tap(e=>this._memoriesSerivce.memoriesFilter$.next(e)));
    this.powerSupply$=this._powerSupplyService.powerSupply$.pipe(tap(e=>this._powerSupplyService.powerSupplyFilter$.next(e)));
    this.graphics$=this._graphicsService.Graphics$.pipe(tap(e=>this._graphicsService.graphicsFilter$.next(e)));
    this.hardDrives$=this._hardDrivesService.hardDrives$.pipe(tap(e=>this._hardDrivesService.hardDriveFilter$.next(e)));
    this.processorCoolers$=this._processorCoolerService.processorCooler$.pipe(tap(e=>this._processorCoolerService.processorCoolerFilter$.next(e)));
  }
  openPopup(name:string){
    this._popupService.openPopup(name,{});
  }
  bindProperty(part:any,name:string,flag:boolean){
    switch (name){
      case 'processor':
        flag ?this.processor=part : this.processor=undefined;
        break;
      case 'graphics':
        flag ?this.graphics=part : this.graphics=undefined;
        break;
      case 'motherboard':
        flag ?this.motherboard=part : this.motherboard=undefined;
        break;
      case 'hard-drive':
        flag ?this.hardDrive=part : this.hardDrive=undefined;
        break;
      case 'case':
        flag ?this.case=part : this.case=undefined;
        break;
      case 'processor-cooler':
        flag ?this.processorCooler=part : this.processorCooler=undefined;
        break;
      case 'memory':
        flag ?this.memory=part : this.memory=undefined;
        break;
      case 'power-supply':
        flag ?this.powerSupply=part : this.powerSupply=undefined;
        break;
    }

  }
}
