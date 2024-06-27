import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../models/area.model';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private apiUrl = 'http://localhost:8080/api/v1/area';  // Cambia esto por tu URL de la API

  constructor(private http: HttpClient) { }

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.apiUrl);
  }

  getAreaById(id: number): Observable<Area> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Area>(url);
  }
}
