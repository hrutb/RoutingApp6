import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserDashComponent } from "./shared/component/user-dash/user-dash.component";
import { ProductDashComponent } from "./shared/component/product-dash/product-dash.component";
// import { NgModel } from "@angular/forms";
import { PageNotFoundComponent } from './shared/component/page-not-found/page-not-found.component';
import { FairsComponent } from "./shared/component/fairs/fairs.component";
import { UserDetailsComponent } from "./shared/component/user-details/user-details.component";
import { UserFormComponent } from "./shared/component/user-form/user-form.component";
import { AuthGuard } from "./shared/service/auth.guard";
import { AuthComponent } from "./shared/component/auth/auth.component";
import { RoleBaseAccessControlGuard } from "./shared/guard/role-base-access-control.guard";
// import { UserFormComponent } from "./shared/component/user-form/user-form.component";


const route: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'user',
    component: UserDashComponent,
    canActivate:[AuthGuard,RoleBaseAccessControlGuard] ,
    data:{
       roles:['admin' ,'superAdmin','buyer']
    },
    children: [
      {
        path: 'add',
        component: UserFormComponent
      },
      {
        path: ':id/edit',
        component: UserFormComponent
      },
      {
        path: ':id',
        component: UserDetailsComponent
      }
    ]
  },
  {
    path: 'product',
    component: ProductDashComponent,
    canActivate:[AuthGuard,RoleBaseAccessControlGuard],
     data:{
       roles:['superaAdmin','buyer']
     }
  },
  {
    path: 'fairs',
    component: FairsComponent,
    canActivate:[AuthGuard]
  },


  {
    path: '**',
    redirectTo: 'login',
    component: PageNotFoundComponent,
    canActivate:[AuthGuard]
  }
]





@NgModule({
  imports: [RouterModule.forRoot(route)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
