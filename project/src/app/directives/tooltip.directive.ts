import { ApplicationRef, ComponentRef, Directive, ElementRef, HostListener, Inject, Injector, Input, ViewContainerRef} from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip.component';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective{
  @Input() explenation ?= '';
  @Input() direction='bottom';
  private componentRef?: ComponentRef<any>;
  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.componentRef) {
      return;
    }
    this.componentRef = this._viewContainerRef.createComponent(TooltipComponent);
    this._document.body.appendChild(this.componentRef.location.nativeElement);
    this.setPosition();
    this.componentRef.hostView.detectChanges();
  }
  @HostListener('mouseleave')
  onMouseLeave(): void {
    if(!this.componentRef){
      return
    }
    this._appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
    this.componentRef=undefined;
  }

  constructor(
    private _elementRef: ElementRef,
    private _appRef: ApplicationRef, 
    private _viewContainerRef: ViewContainerRef,
    @Inject(DOCUMENT) private _document:Document
    ) {}

  private setPosition() {
    if (!this.componentRef) {
      return;
    }
      this.componentRef.instance.text = this.explenation;
      const {left, right, bottom,top,width,height} =this._elementRef.nativeElement.getBoundingClientRect();
      switch(this.direction){
        case 'top':
          this.componentRef.instance.left = (right-left)/2 +left;
          this.componentRef.instance.top = top-height*1.3;
          break;
        case 'bottom':
          this.componentRef.instance.left = (right-left)/2 +left;
          this.componentRef.instance.top = bottom;
          break;
        case 'left':
          this.componentRef.instance.left = left-((right-left)/2)*2.5;
          this.componentRef.instance.top = bottom -height;
          break;
        case 'right':
          this.componentRef.instance.top = bottom -height;
          this.componentRef.instance.left = right+((right-left)/2)*2.5;
          break;
      }
      this.componentRef.instance.direction=this.direction;
      // this.componentRef.instance.left = right + width;
      // this.componentRef.instance.top = bottom;
      /// top (bottom-top) /2 
      //left left -((right-left)/2)*3
  }
}
