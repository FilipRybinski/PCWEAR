import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartComponent {
  @Input() imageUrl!:string;
  @Input() name!:string;
  @Input() comments!:number;

}
