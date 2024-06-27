import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  isLoading = false; // Variable para el estado de carga

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      email: ['', Validators.required],  // Assuming email is passed to this component
      token: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      this.isLoading = true; // Iniciar la carga
      const { email, token, password } = this.resetPasswordForm.value;
      this.authService.updatePassword(email, token, password).subscribe(
        () => {
          this.isLoading = false; // Finalizar la carga
          this.snackBar.open('Contraseña cambiada con éxito', 'Cerrar', {
            duration: 3000
          });
          this.router.navigate(['/']);
        },
        (error) => {
          this.isLoading = false; // Finalizar la carga
          this.snackBar.open('Error al cambiar la contraseña', 'Cerrar', {
            duration: 3000
          });
        }
      );
    }
  }
}
