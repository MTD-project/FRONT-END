import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService} from "../../services/user.service";
import { Usuario} from "../../models/user.model";
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'role'];
  dataSource = new MatTableDataSource<Usuario>(); // Inicializado aquí
  selection = new SelectionModel<Usuario>(true, []);

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.obtenerUsuarios().subscribe(users => {
      this.dataSource.data = users;
    });
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
      data: { selectedUsers }
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
        });
      }
    });
  }
}
