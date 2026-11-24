import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleBaseAccessControlGuard implements CanActivate {
    constructor(private _authServ:AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let role  = this._authServ.getUserRole() ;
    let rolesArr= route.data['roles'] ; //index signature property is used insted of the get mthod
     return rolesArr.includes(role)

  }

}
