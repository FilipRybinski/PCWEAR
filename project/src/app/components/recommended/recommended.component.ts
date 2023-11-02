import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recommended } from 'src/app/interfaces/recommended.model';
import { RecommendedService } from 'src/app/services/recommended.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.scss']
})
export class RecommendedComponent implements OnInit{
  recommended$!:Observable<Recommended[]>;
  constructor(
    private _recommendedService:RecommendedService
    ){}
  ngOnInit(): void {
    this.recommended$=this._recommendedService.getRecommended();
  }

}
