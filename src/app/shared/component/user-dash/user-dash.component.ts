import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../service/user-api.service';
import { Iuser } from '../../model/user.model';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.scss']
})
export class UserDashComponent implements OnInit {

  constructor(private _userserivce:UserApiService, private _snackbar:SnackbarService) { }
 user!:Iuser ;
  ngOnInit(): void {
     this.getAllUsers();
      this._userserivce.submitUser$
          .subscribe(res=>{
             if(res){
                console.log(res);
               this.userArr.unshift(res);

             }
          })


          this.getupdateUser() ;
          this.removeUser();
  }
   userArr:Iuser[] = [] ;

   removeUser(){
      this._userserivce.removeUsr$
      .subscribe((resId)=>{
               if(resId){
                  let getIndex = this.userArr.findIndex(ele=>ele.id===resId) ;
                       this.userArr.splice(getIndex,1) ;
                        this.userArr = [...this.userArr];
                       this._snackbar.Snackbar('deleted successfully....!')
                }
      })
   }

 getupdateUser(){
       this._userserivce.updateuserObj$
          .subscribe((res)=>{
                 console.log(res);
              if(res){

              }
          })
 }
    getAllUsers(){
         this._userserivce.fetchUsers()
          .subscribe(obj=>{
                console.log(obj);
            for(let key  in obj){
                   this.userArr.push({...obj[key] , id:key})
            }
            console.log(this.userArr);
          })
    }



}
