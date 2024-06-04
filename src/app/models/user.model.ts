export interface User {
  nombre: string;
  telefono?: string;
  correo: string;
  password: string;
}

export interface DatosActualizarUsuario {
  nombre?: string;
  telefono?: string;
  correo?: string;
  password?: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  telefono: string;
  correo: string;
  enabled: boolean;
  rol: string;
}
