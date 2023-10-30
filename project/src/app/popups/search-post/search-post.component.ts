import { Component, OnInit } from '@angular/core';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.scss']
})
export class SearchPostComponent extends PopupTemplateComponent implements OnInit{
  constructor(private _popupSerive:PopupService){
    super();
  }
  ngOnInit(): void {}
  exit(){
    this._popupSerive.clearPopup();
  }

}
