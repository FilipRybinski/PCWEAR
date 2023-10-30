import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Graphics } from 'src/app/interfaces/graphics.model';
import { GraphicsService } from 'src/app/services/graphics.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent {
  parts$!:Observable<Graphics[]>;
  constructor(private _graphicsService:GraphicsService){}
  ngOnInit(): void {
    this.parts$=this._graphicsService.Graphics$.pipe(tap(e=>this._graphicsService.graphicsFilter$.next(e)));
  }
  pagination(page:number){
    this._graphicsService.pagination.setPage=page;
    this._graphicsService.refreshGraphics();
  }
  changePageSize(pageSize:number){
    this._graphicsService.pagination.setPageSize=pageSize;
    this._graphicsService.refreshGraphics();
  }
  resetFilter(){
    this._graphicsService.pagination.setQueryParams(true);
    this._graphicsService.refreshGraphics();
  }
  get page(){
    return this._graphicsService.pagination.getPage;
  }
  get pageSize(){
    return this._graphicsService.pagination.getPageSize;
  }
}
