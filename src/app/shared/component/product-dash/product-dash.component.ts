import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../service/user-api.service';

@Component({
  selector: 'app-product-dash',
  templateUrl: './product-dash.component.html',
  styleUrls: ['./product-dash.component.scss']
})
export class ProductDashComponent implements OnInit {

  constructor(private _userService:UserApiService) { }

  ngOnInit(): void {

  }

}
