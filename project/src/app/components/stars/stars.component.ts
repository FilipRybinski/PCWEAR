import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit{
  @Input() comments!:number;
  @Input() rating!:number;
  count:number=6;
  ngOnInit(): void {
    this.rating=Math.ceil(this.rating);
  }
}
