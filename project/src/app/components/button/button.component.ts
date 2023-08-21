import { Component, ElementRef, Input, OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit{
  @Input() isActive!:boolean;
  @Input() highLightCurrentRoute:boolean=false;
  constructor(private _element:ElementRef,private router: Router){
  }
  ngOnInit(): void {
    if(this.highLightCurrentRoute){
      this.router.events.subscribe(e=>{
        if(e instanceof NavigationEnd){
            if(e.url.includes(this._element.nativeElement.textContent)){
                this.isActive=true;
            }else{
              this.isActive=false;
            }
        }
      })
    }
  }
}
