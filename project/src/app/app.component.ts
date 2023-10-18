import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { RouteSlideIn } from './constants/routeAnimations';
import { CookieService } from './services/cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[RouteSlideIn]
})
export class AppComponent implements OnInit {
  title = 'project';
  constructor(private _accountService:AccountService,private _storageService:CookieService){}
  ngOnInit(): void {
    this._accountService.getCurrentUser().subscribe(
      {next:(res)=>
        {
        if(!this._storageService.check(res))this._storageService.setToken=JSON.stringify(res);
        this._accountService.currentLoggedUser=res;
        }
      }
      )
  }
}
