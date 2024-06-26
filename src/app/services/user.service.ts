import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1/usuario'; // Ajusta esta URL a tu API real

  constructor(private http: HttpClient) {}

  obtenerRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/roles`);
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/listar`);
  }

  actualizarRoles(data: { selectedUsers: number[], newRole: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar-roles`, data);
  }
}
