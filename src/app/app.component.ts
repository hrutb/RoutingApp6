import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SpinnerService } from './shared/service/spinner.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'RoutingApp6';

   _cdr = inject(ChangeDetectorRef)

  isLoading:boolean = false;
  spinnerService = inject(SpinnerService)
  isLoading$= this.spinnerService.isLoading

       ngOnInit(): void {
                this.spinnerService.isLoading
                       .subscribe(res=>{
                          this.isLoading = res;
                          this._cdr.detectChanges();
                       })
                  }


       }


