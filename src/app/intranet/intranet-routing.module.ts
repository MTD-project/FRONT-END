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
import {ActividadesComponent} from "./actividades/actividades.component";



const routes: Routes = [

    { path: '', component: InicioComponent,
    children: [
        {path: 'calendario', component: CalendarioComponent },

        {
          path: 'admin', component: AdminComponent, canActivate: [AdminGuard],
          children: [

           ],
        },
        {
          path: 'user', component: UserComponent, canActivate: [UserGuard],
          children: [
            {path: 'calendario',  component: CalendarioComponent },
            {path: 'lista-usuarios',  component: GestionUsuariosComponent },
            {path: 'areas',  component: AreasComponent },
            {path: 'actividades',  component: ActividadesComponent },
            {path: 'asistencias',  component: AsistenciasComponent }



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
