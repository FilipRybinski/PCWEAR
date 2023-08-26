import { Component, ElementRef, Input, OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-button-navigation',
  templateUrl: './button-navigation.component.html',
  styleUrls: ['./button-navigation.component.scss']
})
export class ButtonNavigationComponent implements OnInit{
  isActive:boolean=false;
  @Input() subButton:boolean=false;
  constructor(private _element:ElementRef,private router: Router){
  }
  ngOnInit(): void {
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
