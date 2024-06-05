import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from "../../services/user.service";
import { Usuario } from "../../models/user.model";
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {
  displayedColumns: string[] = ['select', 'nombre', 'apellido', 'correo', 'telefono', 'rol'];
  dataSource = new MatTableDataSource<Usuario>();
  selection = new SelectionModel<Usuario>(true, []);

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.obtenerUsuarios().subscribe(
      (users: Usuario[]) => {
        this.dataSource.data = users;
      },
      error => {
        console.error('Error al cargar los usuarios', error);
        this.snackBar.open('Error al cargar los usuarios', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  toggle(row: Usuario) {
    this.selection.toggle(row);
  }

  openRoleDialog(): void {
    const selectedUsers = this.selection.selected;
    if (selectedUsers.length === 0) {
      this.snackBar.open('Selecciona al menos un usuario', 'Cerrar', {
        duration: 2000,
      });
      return;
    }

    const dialogRef = this.dialog.open(RoleDialogComponent, {
      width: '250px',
      data: { selectedUsers, newRole: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const selectedUserIds = selectedUsers.map(user => user.id).filter(id => id !== undefined) as number[];
        this.userService.actualizarRoles({
          selectedUsers: selectedUserIds,
          newRole: result
        }).subscribe(() => {
          this.snackBar.open('Roles actualizados exitosamente', 'Cerrar', {
            duration: 2000,
          });
          this.ngOnInit();
        }, error => {
          console.error('Error al actualizar los roles', error);
          this.snackBar.open('Error al actualizar los roles', 'Cerrar', {
            duration: 3000,
          });
        });
      }
    });
  }
}
