export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  enabled: boolean;
  rol: string;
  birthday: string;
}

export type DatosActualizarUsuario = Partial<Usuario>;
