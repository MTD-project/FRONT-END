import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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
  filteredDataSource = new MatTableDataSource<Usuario>();
  selection = new SelectionModel<Usuario>(true, []);
  users: Usuario[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.userService.obtenerUsuarios().subscribe(
      (users: Usuario[]) => {
        this.users = users;
        this.dataSource.data = users;
        this.filteredDataSource.data = users;
        this.filteredDataSource.paginator = this.paginator;
        this.filteredDataSource.sort = this.sort;
        this.restoreSelection();
        this.updateCheckboxState();
      },
      (error: any) => {
        console.error('Error al cargar los usuarios', error);
        this.snackBar.open('Error al cargar los usuarios', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredDataSource.filter = filterValue;
  }

  filterByRole(role: string): void {
    if (role === '') {
      this.filteredDataSource.data = this.users;
    } else {
      this.filteredDataSource.data = this.users.filter(user => user.rol.toLowerCase() === role.toLowerCase());
    }
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
    this.updateCheckboxState();
  }

  toggle(row: Usuario): void {
    this.selection.toggle(row);
    this.updateCheckboxState();
  }

  updateCheckboxState(): void {
    const allSelected = this.isAllSelected();
    const indeterminate = this.selection.hasValue() && !allSelected;
  }

  checkboxLabel(row?: Usuario): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id ?? ''}`;
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
      data: { selectedUsers: selectedUsers.map(user => user.id).filter(id => id !== undefined) as number[], newRole: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Roles actualizados exitosamente', 'Cerrar', {
          duration: 2000,
        });
        this.loadUsuarios(); // Actualiza la lista de usuarios después de actualizar los roles
      }
    }, error => {
      console.error('Error al cerrar el diálogo', error);
      this.snackBar.open('Error al cerrar el diálogo', 'Cerrar', {
        duration: 3000,
      });
    });
  }

  private restoreSelection(): void {
    const selectedIds = this.selection.selected.map(user => user.id);
    this.selection.clear();
    this.dataSource.data.forEach(row => {
      if (selectedIds.includes(row.id)) {
        this.selection.select(row);
      }
    });
    this.updateCheckboxState();
  }
}
