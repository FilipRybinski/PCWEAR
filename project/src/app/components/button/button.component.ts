import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() explenation!:string;
  @Input() direction:string='bottom'
  @Input() custom:boolean=false;
  @Input() isActive:boolean=false;
}
