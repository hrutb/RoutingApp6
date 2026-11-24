import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }


 private readonly isloadingStatus$  = new BehaviorSubject<boolean>(false) ;
         readonly isLoading = this.isloadingStatus$.asObservable() ;



   show(){
      setTimeout(()=>{ this.isloadingStatus$.next(true),0})
      }

      hide(){
         setTimeout(()=>{this.isloadingStatus$.next(false)},0)
      }

}
