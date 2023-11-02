import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Motherboard } from 'src/app/interfaces/motherboard.model';
import { Part } from 'src/app/interfaces/part.model';
import { MotherboardService } from 'src/app/services/motherboard.service';


@Component({
  selector: 'app-motherboard',
  templateUrl: './motherboard.component.html',
  styleUrls: ['./motherboard.component.scss']
})
export class MotherboardComponent  implements OnInit{
 @Input() creator:boolean=false;
 @Output() part:EventEmitter<Part>=new EventEmitter<Part>();
 parts$!:Observable<Motherboard[]>;
 constructor(private _motherboardSerivce:MotherboardService){}
  ngOnInit(): void {
    this.parts$=this._motherboardSerivce.motherboards$.pipe(tap(e=>this._motherboardSerivce.motherboardFilter$.next(e)));
  }
  pagination(page:number){
    this._motherboardSerivce.pagination.setPage=page;
    this._motherboardSerivce.refreshMotherboards();
  }
  changePageSize(pageSize:number){
    this._motherboardSerivce.pagination.setPageSize=pageSize;
    this._motherboardSerivce.refreshMotherboards();
  }
  resetFilter(){
    this._motherboardSerivce.pagination.setQueryParams(true);
    this._motherboardSerivce.refreshMotherboards();
  }
  emitPart(part:Motherboard){
    this.part.emit(part);
  }
  get page(){
    return this._motherboardSerivce.pagination.getPage;
  }
  get pageSize(){
    return this._motherboardSerivce.pagination.getPageSize;
  }
}
