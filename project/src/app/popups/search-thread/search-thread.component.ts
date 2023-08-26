import { Component, OnInit } from '@angular/core';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-search-thread',
  templateUrl: './search-thread.component.html',
  styleUrls: ['./search-thread.component.scss']
})
export class SearchThreadComponent extends PopupTemplateComponent implements OnInit{
  constructor(private _popupService:PopupService){
    super();
  }
  ngOnInit(): void {
    this.isVisible=true;
    this.waiting=true;
  }
  exit(){
    this._popupService.clearPopup();
  }
}
