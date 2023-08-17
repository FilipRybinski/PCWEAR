import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private style:HTMLStyleElement=document.createElement("style");
  constructor() {
    this.style.textContent=`body{overflow-y:hidden;}`
   }
  disableScroll(){
    const portal=document.querySelector("app-popup-portal");
    if(portal?.childElementCount==1) document.body.appendChild(this.style);
  }
  enableScroll(){
    const style=document.body.querySelector("style");
    const portal=document.querySelector("app-popup-portal");
    if(style && portal?.childElementCount==1){
      document.body.removeChild(this.style);
    }else if(style && portal){
      document.body.removeChild(this.style);
    }
  }
}
