import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HardDrive } from 'src/app/interfaces/hard-drive.model';
import { Part } from 'src/app/interfaces/part.model';
import { HardDriveService } from 'src/app/services/hard-drive.service';

@Component({
  selector: 'app-hard-drive',
  templateUrl: './hard-drive.component.html',
  styleUrls: ['./hard-drive.component.scss']
})
export class HardDriveComponent {
  @Input() creator:boolean=false;
  @Output() part:EventEmitter<Part>=new EventEmitter<Part>();
  parts$!:Observable<HardDrive[]>;
  constructor(private _hardDrivesService:HardDriveService){}
  ngOnInit(): void {
    this.parts$=this._hardDrivesService.hardDrives$.pipe(tap(e=>this._hardDrivesService.hardDriveFilter$.next(e)));
  }
  pagination(page:number){
    this._hardDrivesService.pagination.setPage=page;
    this._hardDrivesService.refreshHardDrives();
  }
  changePageSize(pageSize:number){
    this._hardDrivesService.pagination.setPageSize=pageSize;
    this._hardDrivesService.refreshHardDrives();
  }
  resetFilter(){
    this._hardDrivesService.pagination.setQueryParams(true);
    this._hardDrivesService.refreshHardDrives();
  }
  emitPart(part:HardDrive){
    this.part.emit(part);
  }
  get page(){
    return this._hardDrivesService.pagination.getPage;
  }
  get pageSize(){
    return this._hardDrivesService.pagination.getPageSize;
  }
}
