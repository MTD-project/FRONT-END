import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import baserUrl from './helper';

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

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  public login(correo: string, password: string): Observable<any> {
    if (correo === '' && password === '') {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
    const loginData = { correo, password };
    return this.http.post(`${baserUrl}/api/v1/usuario/login`, loginData).pipe(
      map((response: any) => {
        const token = response.token;
        this.setToken(token);
        const decodedToken = jwtDecode<JwtPayload>(token); // Decodificar como JwtPayload
        this.currentUserRole.next(decodedToken.role); // Usar el role del token
        return response;
      })
    );
  }

  // Método para registrar un nuevo usuario
  public register(user: any): Observable<any> {
    return this.http.post(`${baserUrl}/api/v1/usuario/registrar`, user);
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

  private checkToken(): void {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      this.currentUserRole.next(decodedToken.role);
      this.loggedIn.next(true);
    }
  }
}
