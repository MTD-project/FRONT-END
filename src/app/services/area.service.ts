import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../models/area.model';
import { Actividad } from '../models/actividad.model';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private apiUrl = 'http://localhost:8080/api/v1/area';  // Cambia esto por tu URL de la API

  constructor(private http: HttpClient) { }

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.apiUrl);
  }

  addArea(area: Area): Observable<Area> {
    return this.http.post<Area>(this.apiUrl, area);
  }

  addActivity(areaId: number, actividad: Actividad): Observable<Actividad> {
    const url = `${this.apiUrl}/${areaId}/actividades`;
    return this.http.post<Actividad>(url, actividad);
  }
}
