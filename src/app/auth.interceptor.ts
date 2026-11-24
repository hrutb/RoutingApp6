import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SpinnerService } from './shared/service/spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private spinner: SpinnerService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
       this.spinner.show()  ;

       const reqClone =req.clone({
                 setHeaders:{
                   auth:'bearer token from LS'
                 }
       })

    return next.handle(reqClone)
       .pipe(
          finalize(()=>{
             this.spinner.hide(); 
          })
       )
  }



}
