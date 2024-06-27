import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { EditProfileDialogComponent } from '../user/edit-profile-dialog/edit-profile-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.css'],
})
export class PerfilAdminComponent implements OnInit {
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
