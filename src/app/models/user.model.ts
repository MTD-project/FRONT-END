export interface Usuario {
  id?: number; // Opcional si se crea un nuevo usuario
  nombre: string;
  apellido: string;
  telefono?: string;
  correo: string;
  password?: string; // Opcional si se actualiza un usuario sin cambiar la contraseña
  enabled?: boolean; // Opcional si no es necesario en todos los contextos
  rol?: string; // Opcional si no es necesario en todos los contextos
}

export type DatosActualizarUsuario = Partial<Usuario>;
