import {Area} from "./area.model";

export interface Actividad {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  linkReunion: { url: string };
  estado: string;
  area: Area;
}
