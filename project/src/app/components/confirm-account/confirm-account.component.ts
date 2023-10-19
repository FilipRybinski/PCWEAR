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
  counter:number=5;
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
          this._toastService.success('','Successfully confirmed');
          const interval=setInterval(()=>{
            --this.counter;
          },1000)
          setTimeout(()=>{
            clearInterval(interval);
            this._router.navigate(['home']);
          },this.counter*1000)
          
        },(err)=>{
          this._toastService.error('','Failed');
        })
      }else{
        this._router.navigate(['home']);
      }
    })
  }
  redirect(){
    this._router.navigate(['home']);
  }
}

