import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.css']
})
export class RoleDialogComponent implements OnInit {
  roles: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<RoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedUsers: number[], newRole: string },
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.obtenerRoles().subscribe(
      roles => this.roles = roles,
      error => console.error('Error al cargar los roles', error)
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
