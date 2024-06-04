import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import { LoginDialogComponent } from '../../../layouts/login-dialog/login-dialog.component';
import Swal from 'sweetalert2';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit{

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.registerForm = this.fb.group({})
  }


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: [''],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { nombre, apellido, telefono, correo, password } = this.registerForm.value;
    const registerData = { nombre, apellido, telefono, correo, password };

    this.authService.register(registerData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Tu cuenta ha sido creada con éxito.',
        }); // Muestra mensaje de éxito
        this.router.navigate(['/intranet/user/calendario']); // Ajusta según tu aplicación
      },
      (error) => {
        console.error('Error al registrar', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: 'Hubo un problema. Intenta nuevamente.',
        }); // Muestra mensaje de error
      }
    );
  }

  openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent);
  }
}
