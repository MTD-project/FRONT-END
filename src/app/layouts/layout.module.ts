import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HeaderComponent} from "./header/header.component";
import {LoginDialogComponent} from "./login-dialog/login-dialog.component";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginDialogComponent
  ],

    imports: [
        CommonModule,
        RouterLink,
        HttpClientModule,
        MatMenuModule,
        MatButtonModule,
        MatToolbarModule,
        MatInputModule,
        MatDialogModule,
        MatFormFieldModule,
        MatCardModule,
        FormsModule
    ],

  exports: [
    HeaderComponent,
    FooterComponent
  ],

})
export class LayoutModule { }
