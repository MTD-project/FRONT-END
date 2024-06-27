import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import baserUrl from './helper';
import { Usuario } from '../models/user.model';

interface JwtPayload {
  id: number;
  correo: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUserRole = new BehaviorSubject<string>('');

  isLoggedIn = this.loggedIn.asObservable();
  private apiUrl = `${baserUrl}/password`;

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  public login(correo: string, password: string): Observable<any> {
    const loginData = { correo, password };
    return this.http.post(`${baserUrl}/api/v1/usuario/login`, loginData).pipe(
      map((response: any) => {
        const token = response.token;
        this.setToken(token);
        const decodedToken = jwtDecode<JwtPayload>(token);
        this.currentUserRole.next(decodedToken.role);
        return response;
      })
    );
  }

  public register(user: any): Observable<any> {
    return this.http.post(`${baserUrl}/api/v1/usuario/registrar`, user).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.currentUserRole.next('');
  }

  public getRole(): Observable<string> {
    return this.currentUserRole.asObservable();
  }

  public getProfile(): Observable<Usuario> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<Usuario>(`${baserUrl}/api/v1/usuario/perfil`, { headers })
      .pipe(
        map((response: Usuario) => response),
        catchError((error) => throwError(error))
      );
  }

  private checkToken(): void {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      this.currentUserRole.next(decodedToken.role);
      this.loggedIn.next(true);
    }
  }

  public updateProfile(userData: Usuario): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .put(`${baserUrl}/api/v1/usuario/perfil/actualizar`, userData, {
        headers,
      })
      .pipe(
        map((response: any) => response),
        catchError((error) => throwError(error))
      );
  }

  sendPasswordResetEmail(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reset`, { email });
  }

  updatePassword(email: string, token: string, newPassword: string): Observable<any> {
    const url = `${this.apiUrl}/update`;
    const body = { email, token, newPassword };
    return this.http.post<any>(url, body);
  }
}
