import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit{
  @Input() assess:boolean=false;
  @Input() comments!:number;
  @Input() rating!:number;
  @Output() assessment=new EventEmitter<number>();
  assessValue!:number;
  count:number=6;
  ngOnInit(): void {
    this.rating=Math.ceil(this.rating);
  }
  addAssessment(value:number){
    this.assessment.emit(value);
    this.assessValue=value;
  }
}
