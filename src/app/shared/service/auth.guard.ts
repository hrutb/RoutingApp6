import { Injectable, Component, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IcanDeactivate } from '../model/deactivate';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanDeactivate<IcanDeactivate>{
  constructor(private _router: Router, private _authServ: AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) :Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


       let token = this._authServ.getToken() ;
        if(token){
             return true
        }
         return this._router.navigate(['login']);
  }

 canDeactivate(
      component:IcanDeactivate,
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot) :Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
          return component.canDeactivate() ;
    }


}
