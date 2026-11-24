import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export type role = 'buyer' | 'admin' | 'superAdmin'

export interface Iuser{
        name:string,
        email:string,
        password:string,
        role:role
}

export interface login{
      email:string,
      password:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 auth_url = environment.authBaseUrl ;

  constructor(private http: HttpClient) { }


  signUp(User :Iuser): Observable<Iuser>{
     return this.http.post<Iuser>(`${this.auth_url}/api/auth/register`, User)
  }

  login(userCred:any):Observable<login>{
    return this.http.post<login>(`${this.auth_url}/api/auth/login`,userCred)

  }


  saveToken(token:string){
     return  localStorage.setItem('token',token) ;

  }

  saveUserRole(userRole:string){
   return  localStorage.setItem('userRole',userRole)
  }

  getUserRole(){
        return localStorage.getItem('userRole')
  }

  getToken(){
     return localStorage.getItem('token');
  }


  isLoggedIn(){
      return !!this.getToken();
  }
  logout(){
     localStorage.removeItem('token') ;
     localStorage.removeItem('userRole')

  }
}
