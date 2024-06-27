import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {Usuario} from "../../models/user.model";
import {EditProfileDialogComponent} from "../user/edit-profile-dialog/edit-profile-dialog.component";

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  name: string = '';
  lastname: string = '';
  email: string = '';
  phonenumber: string = '';

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.authService.getProfile().subscribe(
      (data: Usuario) => {
        console.log(data);
        this.name = data.nombre;
        this.lastname = data.apellido;
        this.email = data.correo;
        this.phonenumber = data.telefono;
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      data: {
        nombre: this.name,
        apellido: this.lastname,
        correo: this.email,
        telefono: this.phonenumber,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.name = result.nombre;
        this.lastname = result.apellido;
        this.email = result.correo;
        this.phonenumber = result.telefono;
      }
    });
  }
}

