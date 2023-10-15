import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopupInterface } from 'src/app/interfaces/popup';
import { PopupService } from 'src/app/services/popup.service';
import { TestComponent } from '../../popups/test/test.component';
import { ScrollService } from 'src/app/services/scroll.service';
import { AddThreadComponent } from 'src/app/popups/add-thread/add-thread.component';
import { SearchThreadComponent } from 'src/app/popups/search-thread/search-thread.component';
import { CreateCategoryComponent } from 'src/app/popups/create-category/create-category.component';
import { EditUserInformationsComponent } from 'src/app/popups/edit-user-informations/edit-user-informations.component';
import { ManageThreadsComponent } from 'src/app/popups/manage-threads/manage-threads.component';
@Component({
  selector: 'app-popup-portal',
  templateUrl: './popup-portal.component.html',
  styleUrls: ['./popup-portal.component.scss'],
})
export class PopupPortalComponent implements OnInit,OnDestroy{
  @ViewChild ('portal',{read:ViewContainerRef}) portal!:ViewContainerRef;
  private readonly _popupComponents:{name:string,component:any}[]=[
    {
    name:'test',
    component:TestComponent
    },
    {
      name:'add-thread',
      component:AddThreadComponent
    },
    {
      name:'search-thread',
      component:SearchThreadComponent
    },
    {
      name:'add-category',
      component:CreateCategoryComponent
    },
    {
      name:'edit-user-informations',
      component:EditUserInformationsComponent
    },
    {
      name:'manage-threads',
      component:ManageThreadsComponent
    }
]
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
      this.clearPopup()
      this._scrollService.enableScroll();
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
