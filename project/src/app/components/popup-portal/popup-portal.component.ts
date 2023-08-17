import { Component, ComponentFactory, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopupInterface } from 'src/app/interfaces/popup';
import { PopupService } from 'src/app/services/popup.service';
import { TestComponent } from '../test/test.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-popup-portal',
  templateUrl: './popup-portal.component.html',
  styleUrls: ['./popup-portal.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        opacity: 0,
      })),
      transition('open <=> closed', [
        animate('0.2s')
      ])
    ]),
  ],
})
export class PopupPortalComponent implements OnInit,OnDestroy{
  @ViewChild ('portal',{read:ViewContainerRef}) portal!:ViewContainerRef;
  private readonly _popupComponents:{name:string,component:any}[]=[{
    name:'test',
    component:TestComponent
  }]
  private _subscitpion=new Subscription();
  isOpen = false;
  constructor(
    private _popupService:PopupService,
    private _scrollService:ScrollService
  ){

  }
  ngOnInit(): void {
    this._subscitpion.add(this._popupService.openPopup$.subscribe(value=>{
      this.toggle();
      this.loadComponent(value.name,value.data);
      this._scrollService.disableScroll();
    }))
    this._subscitpion.add(this._popupService.clearPortal$.subscribe(()=>{
      this.clearPortal();
    }))
    this._subscitpion.add(this._popupService.clearPopup$.subscribe(()=>{
      this.toggle();
      setTimeout(()=>{
        this.clearPopup()
        this._scrollService.enableScroll();
      },500);
    }))
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }
  loadComponent(name:string,data:any){
    const currentPopupComponent=this._popupComponents.find(popup=>popup.name==name)?.component;
    if(!currentPopupComponent) return;
    const componentRef=this.portal.createComponent<PopupInterface<typeof data>>(currentPopupComponent);
    componentRef.instance.data=data;
  }
  clearPortal(){
    this.portal.clear();
  }
  clearPopup(){
    this.portal.remove();
  }
  ngOnDestroy(): void {
    this._subscitpion.unsubscribe();
  }
}
