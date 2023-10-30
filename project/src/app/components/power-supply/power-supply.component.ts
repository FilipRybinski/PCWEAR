import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PowerSupply } from 'src/app/interfaces/powerSupply.model';
import { PowerSupplyService } from 'src/app/services/power-supply.service';

@Component({
  selector: 'app-power-supply',
  templateUrl: './power-supply.component.html',
  styleUrls: ['./power-supply.component.scss']
})
export class PowerSupplyComponent {
  parts$!:Observable<PowerSupply[]>;
  constructor(private _powerSupplyService:PowerSupplyService){}
  ngOnInit(): void {
    this.parts$=this._powerSupplyService.powerSupply$.pipe(tap(e=>this._powerSupplyService.powerSupplyFilter$.next(e)));
  }
  pagination(page:number){
    this._powerSupplyService.pagination.setPage=page;
    this._powerSupplyService.refreshPowerSupply();
  }
  changePageSize(pageSize:number){
    this._powerSupplyService.pagination.setPageSize=pageSize;
    this._powerSupplyService.refreshPowerSupply();
  }
  resetFilter(){
    this._powerSupplyService.pagination.setQueryParams(true);
    this._powerSupplyService.refreshPowerSupply();
  }
  get page(){
    return this._powerSupplyService.pagination.getPage;
  }
  get pageSize(){
    return this._powerSupplyService.pagination.getPageSize;
  }
}
