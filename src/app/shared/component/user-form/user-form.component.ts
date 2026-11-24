import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Iuser } from '../../model/user.model';
import { UserApiService } from '../../service/user-api.service';
import { ActivatedRoute, Params, Router, CanDeactivate } from '@angular/router';
import { IcanDeactivate } from '../../model/deactivate';
import { Observable } from 'rxjs';
import { log } from 'console';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, IcanDeactivate {

  userId !: String

  constructor(private _userSerivce: UserApiService, private _routes: ActivatedRoute, private _router: Router) { }
  // candeactivate: () => boolean | Observable<boolean> | Promise<boolean>;


  ngOnInit(): void {
    this.onCreate();

    this.newSkills();

    this.userId = this._routes.snapshot.paramMap.get('id') as string
    let userRole = this._routes.snapshot.queryParams['userRole'];


    this.valueChanges();
    this.patchValues();

    this.oneditFun()
  }

  UserForm!: FormGroup;

  IsInEditMode: boolean = false;

  // oneditFun(){
  //   this._routes.params.subscribe((id: Params)=> {
  //     if(id['id']){
  //       this.userId = id['id']
  //     }

  //     console.log(this.userId);

  //   })
  // }


  oneditFun() {

    this._userSerivce.editUserObj$
      .subscribe((res: any) => {
        if (res) {
          console.log(res);
          this.IsInEditMode = true;
          // let userobj = params['']
          console.log(res.skills)

          this.skillsArr.clear();

          if (res.skills && Array.isArray(res.skills)) {
            res.skills.forEach((skill: string) => {

              this.skillsArr.push(new FormControl(skill, Validators.required))
            });
          }
          this.UserForm.patchValue(res);


        }

      })

  }

  onAddUser() {
    this.onCreate();

  }

  onCreate() {
    this.UserForm = new FormGroup({
      name: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      experience: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),

      currentAddress: new FormGroup({
        state: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        zipcode: new FormControl('', Validators.required),

      }),
      permanentAddress: new FormGroup({
        state: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        zipcode: new FormControl('', Validators.required),
      }),
      skills: new FormArray([]),

      isAddSame: new FormControl({ value: false, disabled: true }),


    })
  }


  get controls() {
    return this.UserForm.controls;
  }

  get skillsArr() {
    return this.UserForm.get('skills') as FormArray;
  }

  newSkills() {
    let controls = new FormControl(null, Validators.required);
    this.skillsArr.push(controls);
  }

  onRemove(i: number) {
    this.skillsArr.removeAt(i);
  }




  valueChanges() {
    this.UserForm.get('currentAddress')?.valueChanges
      .subscribe(res => {
        console.log(res);
        if (this.UserForm.get('currentAddress')?.valid) {
          this.UserForm.get('isAddSame')?.enable();
        } else {
          this.controls['isAddSame'].disable();
          this.controls['isAddSame'].reset();
        }
      })
  }

  patchValues() {
    this.controls['isAddSame']?.valueChanges
      .subscribe(isValid => {
        if (isValid) {
          let currentAdd = this.UserForm.get('currentAddress')?.value
          this.UserForm.get('permanentAddress')?.patchValue(currentAdd);
          this.UserForm.get('permanentAddress')?.disable();
        } else {
          this.UserForm.get('permanentAddress')?.enable();
          this.UserForm.get('permanentAddress')?.reset();


        }
      })
  }



  onAddSubmit() {

    let newUser: Iuser = {
      ...this.UserForm.getRawValue(),
      // id:Date.now(),
      // Uid:Date.now().toString()
    }
    if (!this.UserForm.valid) {
      this.UserForm.markAllAsTouched();
    } else {
      this._userSerivce.createUsers(newUser)
        .subscribe({
          next: res => {
            if (res) {
              this._userSerivce.submitUser$.next(res);
              this._router.navigate(['user']);
            }

          },
          error: err => {
            console.log(err)
          }
        })
    }
  }


  patchValuesForm(User: Iuser) {
    this.skillsArr.clear();
    for (const skill of User.skills) {
      this.skillsArr.push(new FormControl(skill, Validators.required))
    }
    this.UserForm.patchValue({
      ...User,
    });

  }

  onUpdateUser() {
    let updatedObj = this.UserForm.getRawValue()
    console.log(updatedObj)
     if(!this.UserForm.valid){
          this.UserForm.markAllAsTouched()
     }else{

       this._userSerivce.updateUser(updatedObj, this.userId).
         subscribe(res => {
           const updatedUser = {
             ...updatedObj,
             ...res
           }
           this._userSerivce.updateuserObj$.next(updatedUser);
         })
       this._router.navigate(['user'])
     }
  }

  canDeactivate() {
    if (this.IsInEditMode && this.UserForm.dirty) {
      let getconfirm = confirm('are you sure want to disacrd changes')
      if (getconfirm) {
        return false;
      }
    }
    return true;
  }

}
