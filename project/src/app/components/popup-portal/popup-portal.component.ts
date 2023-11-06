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
import { ManagePermissionsComponent } from 'src/app/popups/manage-permissions/manage-permissions.component';
import { ManageArchivesComponent } from 'src/app/popups/manage-archives/manage-archives.component';
import { AddPostComponent } from 'src/app/popups/add-post/add-post.component';
import { AssessPartComponent } from 'src/app/popups/assess-part/assess-part.component';
import { SearchPostComponent } from 'src/app/popups/search-post/search-post.component';
import { SearchMotherboardComponent } from 'src/app/popups/search-motherboard/search-motherboard.component';
import { SearchProcessorComponent } from 'src/app/popups/search-processor/search-processor.component';
import { SearchMemoryComponent } from 'src/app/popups/search-memory/search-memory.component';
import { SearchHardDriveComponent } from 'src/app/popups/search-hard-drive/search-hard-drive.component';
import { SearchProcessorCoolerComponent } from 'src/app/popups/search-processor-cooler/search-processor-cooler.component';
import { SearchGraphicsComponent } from 'src/app/popups/search-graphics/search-graphics.component';
import { SearchPowerSupplyComponent } from 'src/app/popups/search-power-supply/search-power-supply.component';
import { SearchCaseComponent } from 'src/app/popups/search-case/search-case.component';
import { ConfirmPostComponent } from 'src/app/popups/confirm-post/confirm-post.component';
import { AddProcessorComponent } from 'src/app/popups/add-processor/add-processor.component';
import { AddProcessorCoolerComponent } from 'src/app/popups/add-processor-cooler/add-processor-cooler.component';
import { AddPowerSupplyComponent } from 'src/app/popups/add-power-supply/add-power-supply.component';
import { AddMotherboardComponent } from 'src/app/popups/add-motherboard/add-motherboard.component';
import { AddMemoryComponent } from 'src/app/popups/add-memory/add-memory.component';
import { AddHardDriveComponent } from 'src/app/popups/add-hard-drive/add-hard-drive.component';
import { AddGraphicsComponent } from 'src/app/popups/add-graphics/add-graphics.component';
import { AddCaseComponent } from 'src/app/popups/add-case/add-case.component';
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
    },
    {
      name:'manage-permission',
      component:ManagePermissionsComponent
    },
    {
      name:'manage-archives',
      component:ManageArchivesComponent
    },
    {
      name:'add-post',
      component:AddPostComponent
    },
    {
      name:'assess-part',
      component:AssessPartComponent
    },
    {
      name:'search-post',
      component:SearchPostComponent
    },
    {
      name:'search-processor',
      component:SearchProcessorComponent
    },
    {
      name:'search-motherboard',
      component:SearchMotherboardComponent
    },
    {
      name:'search-memory',
      component:SearchMemoryComponent
    },
    {
      name:'search-hardDrive',
      component:SearchHardDriveComponent
    },
    {
      name:'search-processorCooler',
      component:SearchProcessorCoolerComponent
    },
    {
      name:'search-graphics',
      component:SearchGraphicsComponent
    },
    {
      name:'search-case',
      component:SearchCaseComponent
    },
    {
      name:'search-powerSupply',
      component:SearchPowerSupplyComponent
    },
    {
      name:'confirm-post',
      component:ConfirmPostComponent
    },
    {
      name:'add-processor',
      component:AddProcessorComponent
    },
    {
      name:'add-processor-cooler',
      component:AddProcessorCoolerComponent
    },
    {
      name:'add-power-supply',
      component:AddPowerSupplyComponent
    },
    {
      name:'add-motherboard',
      component:AddMotherboardComponent
    },
    {
      name:'add-memory',
      component:AddMemoryComponent
    },
    {
      name:'add-hard-drive',
      component:AddHardDriveComponent
    },
    {
      name:'add-graphics',
      component:AddGraphicsComponent
    },
    {
      name:'add-case',
      component:AddCaseComponent
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
