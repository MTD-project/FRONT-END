export interface User {
  nombre: string;
  apellido: string;
  telefono?: string;
  correo: string;
  password: string;
}

export interface DatosActualizarUsuario {
  nombre?: string;
  apellido?: string;
  telefono?: string;
  correo?: string;
  password?: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  enabled: boolean;
  rol: string;
}
