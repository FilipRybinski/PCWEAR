import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentRef, Directive, ElementRef, Inject, Input, SimpleChanges, ViewContainerRef } from '@angular/core';
import { LoaderComponent } from '../components/loader/loader.component';
import { ScrollService } from '../services/scroll.service';

@Directive({
  selector: '[appLoader]'
})
export class LoaderDirective {
  @Input() isWaitting:boolean=false
  private componentRef?: ComponentRef<any>;
  constructor(
    private _appRef: ApplicationRef,
    private _elementRef:ElementRef,
    private _viewContainerRef: ViewContainerRef,
    private _scrollService:ScrollService,
    @Inject(DOCUMENT) private _document:Document){}
    ngOnChanges(changes: SimpleChanges): void {
      if(this.isWaitting){
        this.createComponent();
      }else{
        this.destroyComponent();
      }
    }
    createComponent(){
      if (this.componentRef) {
        return;
      }
      this.componentRef = this._viewContainerRef.createComponent(LoaderComponent);
      this._elementRef.nativeElement.appendChild(this.componentRef.location.nativeElement)
      // this._document.body.appendChild(this.componentRef.location.nativeElement);
      this.componentRef.hostView.detectChanges();
      this._scrollService.disableScroll();
    }
    destroyComponent(){
      if(!this.componentRef){
        return
      }
      this._appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef=undefined;
    }
}
