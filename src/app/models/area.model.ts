import { Actividad } from './actividad.model';

export interface Area {
  id: number;
  nombre: string;
  descripcion: string;
  actividades?: Actividad[];
}
