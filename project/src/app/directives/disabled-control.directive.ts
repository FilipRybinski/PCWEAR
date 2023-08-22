import { Directive, Input, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDisabledControl]'
})
export class DisabledControlDirective {
  @Input() disableControl = false;

  constructor(private ngControl: NgControl) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('change');
    if (changes['disableControl'] && this.ngControl.control) {
      const action = this.disableControl ? 'enable':'disable' ;
      this.ngControl.control[action]();
    }
  }
}
