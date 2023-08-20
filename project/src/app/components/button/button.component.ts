import { AfterViewInit, Component, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements AfterViewInit{
  @Input() isActive!:boolean;
  @Input() parentNode!:HTMLElement;
  constructor(private renderer:Renderer2,private _element:ElementRef){
  }
  ngAfterViewInit(): void {
    if(this.parentNode){
      this.parentNode.childNodes.forEach(e=>this.renderer.listen(e,'click',(event:Event)=>{
        if(e!=this._element.nativeElement){
          if(this.isActive==true) this.isActive=false;
        }
      }))
    }
  }
  @HostListener('click', ['$event'])
  clickin() {
    setTimeout(()=>{
      if(this.isActive!=undefined)
      this.isActive=!this.isActive;
    },0)
    
  }
}
