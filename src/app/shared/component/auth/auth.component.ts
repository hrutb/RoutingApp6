import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, login } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) { }
  mode: 'signUp' | "login" = 'signUp'
  signUpForm!: FormGroup;
  loginform!: FormGroup;
  isAllreadyHaveAccount: boolean = false


  ngOnInit(): void {
    this.onCreateForm()
  }


  onCreateForm() {
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    })

    this.loginform = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })


  }

  onSingUp() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched()
    }

    console.log(this.signUpForm.getRawValue())

    this._authService.signUp(this.signUpForm.getRawValue())
      .subscribe({
        next: res => {

          this.isAllreadyHaveAccount = true;
        }

      })
  }

  onLogin() {
    let loginObj: login = this.loginform.getRawValue();

    this._authService.login(loginObj)
      .subscribe({
        next: res => {
          console.log(res);
          this._authService.saveToken((res as login & { token: string }).token)
          this._authService.saveUserRole((res as login & { userRole: string }).userRole);
          this._router.navigate(['home'])
          console.log(res)
        }
      })

  }

}
