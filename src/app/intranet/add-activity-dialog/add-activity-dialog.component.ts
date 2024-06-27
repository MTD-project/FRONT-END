import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-activity-dialog',
  templateUrl: './add-activity-dialog.component.html',
  styleUrls: ['./add-activity-dialog.component.css']
})
export class AddActivityDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddActivityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string, description: string, fecha: string, linkReunion: { url: string }, estado: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
