import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Part } from 'src/app/interfaces/part.model';
import { ComponentsService } from 'src/app/services/components.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit{
  parts$!:Observable<Part[]>;
  favourite:boolean=false;
  constructor(
    private _route:ActivatedRoute,
    private _componentsService:ComponentsService
    ){}
  ngOnInit(): void {
    if(this._route.snapshot.routeConfig?.path?.includes('favourite')){
      this.favourite=true;
      this.parts$=this._componentsService.getFavourites();
    }else{
      this.parts$=this._componentsService.getTop7();
    }
  }

}
