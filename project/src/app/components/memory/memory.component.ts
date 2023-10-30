import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Memory } from 'src/app/interfaces/memory.model';
import { MemoryService } from 'src/app/services/memory.service';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent implements OnInit{
  parts$!:Observable<Memory[]>;
  constructor(private _memoriesSerivce:MemoryService){}
  ngOnInit(): void {
    this.parts$=this._memoriesSerivce.memories$.pipe(tap(e=>this._memoriesSerivce.memoriesFilter$.next(e)));
  }
  pagination(page:number){
    this._memoriesSerivce.pagination.setPage=page;
    this._memoriesSerivce.refreshMemories();
  }
  changePageSize(pageSize:number){
    this._memoriesSerivce.pagination.setPageSize=pageSize;
    this._memoriesSerivce.refreshMemories();
  }
  resetFilter(){
    this._memoriesSerivce.pagination.setQueryParams(true);
    this._memoriesSerivce.refreshMemories();
  }
  get page(){
    return this._memoriesSerivce.pagination.getPage;
  }
  get pageSize(){
    return this._memoriesSerivce.pagination.getPageSize;
  }
}
