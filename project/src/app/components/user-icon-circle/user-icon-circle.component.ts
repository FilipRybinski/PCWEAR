import { Component, Input } from '@angular/core';
import {bounceInOnEnterAnimation,bounceOutOnLeaveAnimation} from 'angular-animations';

@Component({
  selector: 'app-user-icon-circle',
  templateUrl: './user-icon-circle.component.html',
  styleUrls: ['./user-icon-circle.component.scss'],
  animations:[
    bounceInOnEnterAnimation(),
    bounceOutOnLeaveAnimation({duration:200})
  ]
})
export class UserIconCircleComponent {
  @Input() text!:string;
  @Input() path!:string;
  @Input() roleId!:number;
  @Input() animation:boolean=false;
  @Input() userId!:number;
}
