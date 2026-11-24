import { Injectable } from '@angular/core';
import{HttpClient, HttpClientModule} from '@angular/common/http' ;
import { environment } from 'src/environments/environment';
import { Iuser } from '../model/user.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private _http:HttpClient) { }

   base_url = environment.Base_url ;

 editUserObj = new BehaviorSubject<Iuser| null>(null);
  editUserObj$ =this.editUserObj.asObservable();

  updateuserObj$ = new BehaviorSubject<Iuser| null>(null) ;
  submitUser$  = new BehaviorSubject<Iuser| null>(null);
  removeUsr$ = new BehaviorSubject<string | null>(null);



   fetchUsers():Observable<Iuser[]>{
     return  this._http.get<Iuser[]>(`${this.base_url}/users.json`)
   }

   fetchUserById(id:string):Observable<Iuser>{
            let  get_url =`${this.base_url}/users/${id}.json`

          return this._http.get<Iuser>(get_url);
   }


   createUsers(newUser:Iuser):Observable<Iuser>{
         return this._http.post<Iuser>(`${this.base_url}/users.json`, newUser);
    }


   onEdit(userObj:Iuser){
          this.editUserObj.next(userObj) ;
   }


   updateUser(updateUser:Iuser,userId:any):Observable<Iuser>{

         let updateUrl = `${this.base_url}/users/${userId}.json` ;
          return this._http.patch<Iuser>(updateUrl, updateUser) ;
    }


    deleteUser(userId:any):Observable<any>{
              let removeUrl = `${this.base_url}/users/${userId}.json` ;
              return this._http.delete(removeUrl) ;
    }

}
