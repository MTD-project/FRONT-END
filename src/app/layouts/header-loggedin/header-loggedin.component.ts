import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header-loggedin',
  templateUrl: './header-loggedin.component.html',
  styleUrls: ['./header-loggedin.component.css'],
})
export class HeaderLoggedinComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;
  userName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.loadUserProfile();
      }
    });

    this.authService.getRole().subscribe((rol: string) => {
      this.isAdmin = rol === 'ADMIN';
      this.isUser = rol === 'MAKER';
    });
  }

  private loadUserProfile(): void {
    this.authService.getProfile().subscribe(profile => {
      this.userName = profile.nombre; // Asegúrate de que el perfil contiene el campo 'nombre'
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
