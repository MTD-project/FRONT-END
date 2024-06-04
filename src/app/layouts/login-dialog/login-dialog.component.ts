import { Component } from '@angular/core';
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {

  loginData = {
    correo: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    this.authService.login(this.loginData.correo, this.loginData.password).subscribe(
      () => {
        this.authService.getRole().subscribe(role => {
          if (role === 'ADMIN') {
            this.router.navigate(['/intranet/admin']);
          } else {
            this.router.navigate(['/intranet/user/calendario']);
          }
        });
      },
      error => {
        console.error('Error al iniciar sesión', error);
        Swal.fire({
          icon: 'error',
          title: 'Usuario o contraseña incorrectos',
          text: 'Por favor, intenta nuevamente.',
        });
      }
    );
  }
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onLogin();
    }
  }
}
