import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserDashComponent } from './shared/component/user-dash/user-dash.component';
import { UserDetailsComponent } from './shared/component/user-details/user-details.component';
import { UserFormComponent } from './shared/component/user-form/user-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductDashComponent } from './shared/component/product-dash/product-dash.component';
import { ProductFormComponent } from './shared/component/product-form/product-form.component';
import { ProductDetailsComponent } from './shared/component/product-details/product-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { LoginComponent } from './shared/component/login/login.component';
import { FairsComponent } from './shared/component/fairs/fairs.component';
import { HomeComponent } from './shared/component/home/home.component';
import { GetConfirmComponent } from './shared/component/get-confirm/get-confirm.component';
import { PageNotFoundComponent } from './shared/component/page-not-found/page-not-found.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.model';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MaterialModule } from './Module/material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthInterceptor } from './auth.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthComponent } from './shared/component/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDashComponent,
    UserDetailsComponent,
    UserFormComponent,
    ProductDashComponent,
    ProductFormComponent,
    ProductDetailsComponent,
    NavbarComponent,
    LoginComponent,
    FairsComponent,
    HomeComponent,
    GetConfirmComponent,
    PageNotFoundComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    // MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule ,
     RouterOutlet,
     RouterLink ,
     AppRoutingModule ,
     HttpClientModule ,
     MatSnackBarModule,MatButtonModule, ReactiveFormsModule,MatChipsModule ,MatProgressSpinnerModule , MatDialogModule
  ],
  providers: [
    {
     provide:HTTP_INTERCEPTORS ,
     useClass:AuthInterceptor ,
     multi:true

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
