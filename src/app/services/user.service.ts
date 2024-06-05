import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/user.model';
import baserUrl from "./helper";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${baserUrl}/api/v1/usuario`;

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<Usuario[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Usuario[]>(`${this.apiUrl}/listar`, { headers });
  }

  actualizarRoles(data: { selectedUsers: number[], newRole: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put(`${this.apiUrl}/actualizar-roles`, data, { headers });
  }

  obtenerRoles(): Observable<string[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<string[]>(`${this.apiUrl}/roles`, { headers });
  }
}
