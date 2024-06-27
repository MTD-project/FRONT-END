import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './calendario/calendario.component';
import { AreasComponent } from './areas/areas.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { AsistenciasComponent } from './asistencias/asistencias.component';
import {ActividadesComponent} from "./actividades/actividades.component";
import {IntranetRoutingModule} from "./intranet-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FullCalendarModule} from "@fullcalendar/angular";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {LayoutModule} from "../layouts/layout.module";
import {UserComponent} from "./user/user.component";
import {AdminComponent} from "./admin/admin.component";
import {InicioComponent} from "./inicio.component";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { RoleDialogComponent } from './role-dialog/role-dialog.component';
import { AreaService } from '../services/area.service';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { PerfilAdminComponent } from './perfil-admin/perfil-admin.component';
import { EditProfileDialogComponent } from './user/edit-profile-dialog/edit-profile-dialog.component';
import {EventModalComponent} from "./event-modal/event-modal.component";
import {ComplementModalComponent} from "./event-modal/complement-modal/complement-modal.component";
import {AddAreaDialogComponent} from "./add-area-dialog/add-area-dialog.component";
import {AddActivityDialogComponent} from "./add-activity-dialog/add-activity-dialog.component";
import {AuthenticationModule} from "../authentication/authentication.module";

@NgModule({
  declarations: [
    CalendarioComponent,
    AreasComponent,
    GestionUsuariosComponent,
    AsistenciasComponent,
    ActividadesComponent,
    UserComponent,
    AdminComponent,
    InicioComponent,
    RoleDialogComponent,
    PerfilUsuarioComponent,
    PerfilAdminComponent,
    EditProfileDialogComponent,
    EventModalComponent,
    ComplementModalComponent,
    AddAreaDialogComponent,
    AddActivityDialogComponent
  ],
  imports: [
    CommonModule,
    IntranetRoutingModule,
    LayoutModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatAutocompleteModule,
    FullCalendarModule,
    FormsModule,
    MatSelectModule,
    MatExpansionModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    AuthenticationModule

  ]
})
export class IntranetModule {
  constructor() {
    console.log("Intranet Loaded");
  }
}
