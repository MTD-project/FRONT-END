import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {LayoutModule} from "../layouts/layout.module";
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import {RegisterUserComponent} from "./register/register-user/register-user.component";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import { LoginComponent } from './login/login.component';
import { LoginPopupComponent } from './login/login-popup/login-popup.component';
import { ForgottComponent } from './login/forgott/forgott.component';



@NgModule({
  declarations: [
    RegisterUserComponent,
    LoginComponent,
    LoginPopupComponent,
    ForgottComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ]
})

export class AuthenticationModule {
  constructor() {
    console.log('AuthenticationModule loaded');
  }
}

