import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserApiService } from '../../service/user-api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Iuser } from '../../model/user.model';
import { SnackbarService } from '../../service/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(private _userServ: UserApiService, private router: Router, private routes: ActivatedRoute, private _snackbar: SnackbarService, private _matDialog: MatDialog) {

  }
  userId: any;

  ngOnInit(): void {
    this.routes.params.subscribe((param: Params) => {
      this.userId = param['id']
      this.getUserById();
    })


  }


  userObj!: Iuser;
  @Output() removeId = new EventEmitter<string>();
  getUserById() {
    console.log(this.userId)
    this._userServ.fetchUserById(this.userId)
      .subscribe({
        next: res => {

          console.log(res);
          this.userObj = res;
          //  console.log(this.userObj)
        },
        error: err => {
          //  this._snackbar.Snackbar(err);
        }
      })

  }


  onEdit() {
    this.router.navigate(['edit'], {
      relativeTo: this.routes
    })
    this._userServ.onEdit(this.userObj);
  }


  onRemove() {
    let matConfig = new MatDialogConfig();
    matConfig.width = '300px';
    matConfig.height = '150px';

    let _matDialogRef = this._matDialog.open(GetConfirmComponent, matConfig);

    _matDialogRef.afterClosed()
      .subscribe(res => {
        if (res) {
          this._userServ.deleteUser(this.userId)
            .subscribe(res => {
              //  this.removeId.emit(this.userId)
               this.router.navigate(['/user']) ;
              this._userServ.removeUsr$.next(res.id);
            })

        }
      })
  }
}
