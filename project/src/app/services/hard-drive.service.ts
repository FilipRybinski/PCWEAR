import { Injectable } from '@angular/core';
import { Pagination } from '../classes/pagination';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { HardDrive } from '../interfaces/hard-drive.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HardDriveService {
  pagination:Pagination=new Pagination();
  refreshHardDrives$=new BehaviorSubject<boolean>(true);
  hardDriveFilter$=new BehaviorSubject<HardDrive[]>([]);
  hardDrives$:Observable<HardDrive[]>=this.refreshHardDrives$.pipe(switchMap(_=>this.getHardDrives()));
  constructor(private _http:HttpClient) { }
  getHardDrives():Observable<HardDrive[]>{
    return this._http.get<HardDrive[]>('https://localhost:5000/api/Hardware/getHardDrive',{params:this.pagination.getQueryParams});
  }
  refreshHardDrives(){
    this.refreshHardDrives$.next(true);
  }
}
