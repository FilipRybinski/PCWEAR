import { ApplicationRef, ComponentRef, Directive, ElementRef, Input, SimpleChanges, ViewContainerRef } from '@angular/core';
import { PopupService } from '../services/popup.service';
import { NoAccessComponent } from '../components/no-access/no-access.component';

@Directive({
  selector: '[appNoAccess]'
})
export class NoAccessDirective {
  @Input() isAccessed:boolean=false;
  private componentRef?: ComponentRef<any>;
  constructor(
    private _appRef: ApplicationRef,
    private _elementRef:ElementRef,
    private _viewContainerRef: ViewContainerRef,
    private _popupService:PopupService){}
    ngOnChanges(changes: SimpleChanges): void {
      if(!this.isAccessed){
        this.createComponent();
      }else{
        this.destroyComponent();
      }
    }
    createComponent(){
      if (this.componentRef) {
        return;
      }
      this.componentRef = this._viewContainerRef.createComponent(NoAccessComponent);
      this._elementRef.nativeElement.appendChild(this.componentRef.location.nativeElement)
      this.componentRef.hostView.detectChanges();
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
