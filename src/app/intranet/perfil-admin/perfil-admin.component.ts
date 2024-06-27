import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private authService: AuthService) {}

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
}
