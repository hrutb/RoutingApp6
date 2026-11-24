import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public router:Router, private _authServ:AuthService) { }

  ngOnInit(): void {
  }

  onlogout(){
     this._authServ.logout();
     this.router.navigate(['login']);
  }

}
