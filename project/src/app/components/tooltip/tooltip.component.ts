import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {
  @Input() text: string = '';
  @Input() direction:string='';
  @Input() left: number = 0;
  @Input() top: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
