import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-label',
  templateUrl: './category-label.component.html',
  styleUrls: ['./category-label.component.scss']
})
export class CategoryLabelComponent {
  @Input() color?:string;
  @Input() bgColor?:string;
  @Input() name?:string;
}
