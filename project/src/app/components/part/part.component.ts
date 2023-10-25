import { Component, Input } from '@angular/core';
import {fadeInOnEnterAnimation} from 'angular-animations';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss'],
  animations:[
    fadeInOnEnterAnimation({delay:300}),
  ]
})
export class PartComponent {
  @Input() partId!:number;
  @Input() imageUrl!:string;
  @Input() name!:string;
  @Input() comments!:number;
  @Input() rating!:number;
}
