import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Processor } from 'src/app/interfaces/processor.model';
import { ProcessorsService } from 'src/app/services/processors.service';

@Component({
  selector: 'app-processors',
  templateUrl: './processors.component.html',
  styleUrls: ['./processors.component.scss']
})
export class ProcessorsComponent implements OnInit{
  parts$!:Observable<Processor[]>;
  constructor(private _processorService:ProcessorsService){}
  ngOnInit(): void {
    this.parts$=this._processorService.processors$.pipe(tap(e=>this._processorService.processorsFilter$.next(e)));
  }
  pagination(page:number){
    this._processorService.pagination.setPage=page;
    this._processorService.refreshProcessors();
  }
  changePageSize(pageSize:number){
    this._processorService.pagination.setPageSize=pageSize;
    this._processorService.refreshProcessors();
  }
  resetFilter(){
    this._processorService.pagination.setQueryParams(true);
    this._processorService.refreshProcessors();
  }
  get page(){
    return this._processorService.pagination.getPage;
  }
  get pageSize(){
    return this._processorService.pagination.getPageSize;
  }

}
