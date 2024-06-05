import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.css']
})
export class RoleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedUsers: number[], newRole: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
