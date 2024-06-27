import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { LoginDialogComponent } from '../../layouts/login-dialog/login-dialog.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  isLoading = false; // Nueva variable para el estado de carga

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.forgotPasswordForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true; // Iniciar la carga
      this.authService.sendPasswordResetEmail(this.forgotPasswordForm.value.correo).subscribe(
        (response: any) => {
          this.isLoading = false; // Finalizar la carga
          this.snackBar.open(response.message, 'Cerrar', {
            duration: 3000
          });
          this.router.navigate(['/ingreso/reset-password']);
        },
        (error) => {
          this.isLoading = false; // Finalizar la carga
          this.snackBar.open(error.error.message || 'Error al enviar el correo de restablecimiento', 'Cerrar', {
            duration: 3000
          });
        }
      );
    }
  }

  openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '400px'
    });
  }
}
