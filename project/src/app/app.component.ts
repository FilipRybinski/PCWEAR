import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { RouteSlideIn } from './constants/routeAnimations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[RouteSlideIn]
})
export class AppComponent implements OnInit {
  title = 'project';
  constructor(private _accountService:AccountService){

  }
  ngOnInit(): void {
    this._accountService.getCurrentUser().subscribe({next:(res)=>this._accountService.currentLoggedUser=res})
  }
}
