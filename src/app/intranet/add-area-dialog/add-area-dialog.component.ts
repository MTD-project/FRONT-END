// add-area-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-area-dialog',
  templateUrl: './add-area-dialog.component.html',
  styleUrls: ['./add-area-dialog.component.css']
})
export class AddAreaDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddAreaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nombre: string; descripcion: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
