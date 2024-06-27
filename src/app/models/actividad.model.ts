export interface Actividad {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  linkReunion: { id: number; url: string };
  estado: 'PENDIENTE' | 'EN_CURSO' | 'FINALIZADO';
}
