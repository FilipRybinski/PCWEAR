import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { Roles } from '../enums/roles';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from '../services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  constructor(private _accountService:AccountService,private _router:Router,private _toastSerivce:ToastrService,private _cookieService:CookieService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this._accountService.user){
      if( this._accountService.user.roleId==Roles.admin){
        return true;
      }else{
        this._toastSerivce.error('You dont have enough permissions to proceed further',this._accountService.currentLoggedUser.email)
        this._router.navigate(['/home']);
        return false;
      }
    }
    if(this._cookieService.userPermission){
      if(this._cookieService.userPermissionNumber==Roles.admin){
        return true;
      }else{
        this._toastSerivce.error('You dont have enough permissions to proceed further',this._cookieService.userPermission.email)
        this._router.navigate(['/home']);
        return false;
      }
    }
    this._toastSerivce.error('You dont have enough permissions to proceed further','Unauthorized access')
    this._router.navigate(['/home']);
    return false;
  }
  
}
