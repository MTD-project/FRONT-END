import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css'],
})
export class EditProfileDialogComponent {
  editProfileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario
  ) {
    this.editProfileForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      apellido: [data.apellido, Validators.required],
      correo: [data.correo, [Validators.required, Validators.email]],
      telefono: [data.telefono],
    });
  }

  onSubmit(): void {
    if (this.editProfileForm.invalid) {
      return;
    }

    this.authService.updateProfile(this.editProfileForm.value).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Perfil actualizado',
          text: 'Tu perfil ha sido actualizado con éxito.',
        });
        this.dialogRef.close(this.editProfileForm.value);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: 'Hubo un problema al actualizar tu perfil. Intenta nuevamente.',
        });
      }
    );
  }
}
