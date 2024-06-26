import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from "../../services/user.service";
import Swal from 'sweetalert2';

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

  guardarRol(): void {
    const selectedUserIds = this.data.selectedUsers.map(user => user);
    this.userService.actualizarRoles({
      selectedUsers: selectedUserIds,
      newRole: this.data.newRole
    }).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Cambio de rol exitoso',
          text: 'Los roles de los usuarios se han actualizado exitosamente.',
        });
      },
      error => {
        console.error('Error al actualizar los roles', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar los roles',
          text: 'Hubo un problema al actualizar los roles de los usuarios. Intenta nuevamente.',
        });
      }
    );
    this.dialogRef.close(this.data.newRole);
  }
}
