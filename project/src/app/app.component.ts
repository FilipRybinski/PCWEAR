import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private _accountService:AccountService){

  }
  ngOnInit(): void {
    this._accountService.getCurrentUser().subscribe((res)=>{
      this._accountService.currentLoggedUser=res;
    })
    AOS.init();
    window.addEventListener('load', AOS.refresh);
  }
  title = 'project';
}
