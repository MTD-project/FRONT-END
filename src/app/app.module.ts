import { NgModule } from '@angular/core';
import {BrowserModule, HammerGestureConfig} from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppRoutingModule} from "./app.routing.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {LayoutModule} from "./layouts/layout.module";
import {AuthenticationModule} from "./authentication/authentication.module";
import { LoginDialogComponent } from './layouts/login-dialog/login-dialog.component';
import { IntranetModule } from './intranet/intranet.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    IntranetModule,


  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
