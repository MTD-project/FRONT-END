export interface Actividad {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  linkReunion: { url: string };
  estado: string;
}
