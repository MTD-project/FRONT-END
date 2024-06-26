import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  userRole: string = '';

  constructor(public dialog: MatDialog, private authService: AuthService) {}

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent);
  }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(status => {
      this.isLoggedIn = status;
    });
    this.authService.getRole().subscribe(role => {
      this.userRole = role;
    });
  }

  logout() {
    this.authService.logout();
  }
}
