import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard} from "../services/guards/admin.guard";
import { UserComponent } from './user/user.component';
import { UserGuard} from "../services/guards/user.guard";
import {AreasComponent} from "./areas/areas.component";
import {AsistenciasComponent} from "./asistencias/asistencias.component";
import {GestionUsuariosComponent} from "./gestion-usuarios/gestion-usuarios.component";
import { ActividadesComponent} from "./actividades/actividades.component";
import {PerfilUsuarioComponent} from "./perfil-usuario/perfil-usuario.component";
import {PerfilAdminComponent} from "./perfil-admin/perfil-admin.component";



const routes: Routes = [

    { path: '', component: InicioComponent,
    children: [

        {
          path: 'admin', component: AdminComponent, canActivate: [AdminGuard],
          children: [

            {path: 'lista-usuarios',  component: GestionUsuariosComponent },
            {path: 'calendario', component: CalendarioComponent },
            {path: 'lista-usuarios',  component: GestionUsuariosComponent },
            {path: 'asistencias',  component: AsistenciasComponent },
            {path: 'areas',  component: AreasComponent },
            {path: 'actividades',  component: ActividadesComponent },
            {path: "perfil", component: PerfilAdminComponent}
           ],
        },
        {
          path: 'user', component: UserComponent, canActivate: [UserGuard],
          children: [
            {path: 'calendario',  component: CalendarioComponent },
            {path: 'actividades',  component: ActividadesComponent },
            {path: "perfil", component: PerfilUsuarioComponent}
           ],
        }
      ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntranetRoutingModule {

}
