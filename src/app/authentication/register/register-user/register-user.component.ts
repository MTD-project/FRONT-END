import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { LoginDialogComponent } from '../../../layouts/login-dialog/login-dialog.component';
import Swal from 'sweetalert2';
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: [''],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  ngOnInit(): void {}

  passwordsMatchValidator(form: FormGroup): null | object {
    return form.get('password')!.value === form.get('password_confirmation')!.value ? null : { passwordsMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
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
        });
        this.router.navigate(['/intranet/user/calendario']);
      },
      (error) => {
        if (error.status === 409) { // Conflict, email or phone already in use
          if (error.error.field === 'correo') {
            this.registerForm.get('correo')!.setErrors({ emailInUse: true });
          } else if (error.error.field === 'telefono') {
            this.registerForm.get('telefono')!.setErrors({ phoneInUse: true });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: 'Hubo un problema. Intenta nuevamente.',
          });
        }
      }
    );
  }

  openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent);
  }
}