import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {DatosActualizarUsuario, User, Usuario} from '../models/user.model';
import baserUrl from "./helper";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${baserUrl}/api/v1/usuario`;

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  obtenerPerfil(): Observable<Usuario> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Usuario>(`${this.apiUrl}/perfil`, { headers });
  }

  actualizarPerfil(datos: DatosActualizarUsuario): Observable<Usuario> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<Usuario>(`${this.apiUrl}/perfil/actualizar`, datos, { headers });
  }

  eliminarCuenta(): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete<string>(`${this.apiUrl}/perfil/eliminar`, { headers });
  }

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
}
