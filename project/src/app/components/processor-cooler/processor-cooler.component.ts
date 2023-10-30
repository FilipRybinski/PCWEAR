import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { processorCooler } from 'src/app/interfaces/processorCooler.model';
import { ProcessorCoolerService } from 'src/app/services/processor-cooler.service';

@Component({
  selector: 'app-processor-cooler',
  templateUrl: './processor-cooler.component.html',
  styleUrls: ['./processor-cooler.component.scss']
})
export class ProcessorCoolerComponent {
  parts$!:Observable<processorCooler[]>;
  constructor(private _processorCoolerService:ProcessorCoolerService){}
  ngOnInit(): void {
    this.parts$=this._processorCoolerService.processorCooler$.pipe(tap(e=>this._processorCoolerService.processorCoolerFilter$.next(e)));
  }
  pagination(page:number){
    this._processorCoolerService.pagination.setPage=page;
    this._processorCoolerService.refreshProcessorCooler();
  }
  changePageSize(pageSize:number){
    this._processorCoolerService.pagination.setPageSize=pageSize;
    this._processorCoolerService.refreshProcessorCooler();
  }
  resetFilter(){
    this._processorCoolerService.pagination.setQueryParams(true);
    this._processorCoolerService.refreshProcessorCooler();
  }
  get page(){
    return this._processorCoolerService.pagination.getPage;
  }
  get pageSize(){
    return this._processorCoolerService.pagination.getPageSize;
  }
}
