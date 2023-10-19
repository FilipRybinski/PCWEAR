import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent  implements OnInit{
  constructor(
    private _routerActive:ActivatedRoute,
    private _accountService:AccountService,
    private _router:Router,
    private _toastService:ToastrService
    ){}
  ngOnInit(): void {
    this._routerActive.queryParams.subscribe(params=>{
      if(params['id'] && params['email']){
        let queryParams=new HttpParams().append('id',params['id']).append('email',params['email'])
        this._accountService.confirmAccount(queryParams).subscribe((res)=>{
          this._router.navigate(['home']);
          this._toastService.success('','Successfully confirmed');
        },(err)=>{
          this._toastService.error('','Failed');
        })
      }
      this._router.navigate(['home']);
    })
  }
}

