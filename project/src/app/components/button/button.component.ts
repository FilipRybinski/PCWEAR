import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() isActive:boolean=false;

  @HostListener('document:click', ['$event'])
  clickout() {
    if(this.isActive==true) this.isActive=!this.isActive;
  }
  @HostListener('click', ['$event'])
  clickin() {
    setTimeout(()=>{
      this.isActive=!this.isActive;
    },0)
    
  }
}
