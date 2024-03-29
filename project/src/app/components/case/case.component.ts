import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Case } from 'src/app/interfaces/case.model';
import { Part } from 'src/app/interfaces/part.model';
import { CaseService } from 'src/app/services/case.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent {
  @Input() creator:boolean=false;
  @Output() part:EventEmitter<Part>=new EventEmitter<Part>();
  parts$!:Observable<Case[]>;
  constructor(private _casesService:CaseService){}
  ngOnInit(): void {
    this.parts$=this._casesService.cases$.pipe(tap(e=>this._casesService.caseFilter$.next(e)));
  }
  pagination(page:number){
    this._casesService.pagination.setPage=page;
    this._casesService. refreshCases();
  }
  changePageSize(pageSize:number){
    this._casesService.pagination.setPageSize=pageSize;
    this._casesService. refreshCases();
  }
  resetFilter(){
    this._casesService.pagination.setQueryParams(true);
    this._casesService.refreshCases();
  }
  emitPart(part:Case){
    this.part.emit(part);
  }
  get page(){
    return this._casesService.pagination.getPage;
  }
  get pageSize(){
    return this._casesService.pagination.getPageSize;
  }
}
