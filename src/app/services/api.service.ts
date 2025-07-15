  import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://apoyosfinancieros.com.mx/api'; // Ajusta esta URL
  private authToken: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.loadToken();
  }

  // ==================== MÉTODOS AUTH ====================
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/login`, { username, password }).pipe(
      tap((response: any) => {
        this.saveToken(response.token);
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.authToken = null;
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.authToken;
  }

  // ==================== MÉTODOS SOLICITUDES ====================
  crearSolicitud(solicitudData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/solicitudes/crear`, solicitudData, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  obtenerSolicitudes(estado?: string): Observable<any> {
    const url = estado 
      ? `${this.apiUrl}/solicitudes?estado=${estado}`
      : `${this.apiUrl}/solicitudes`;
    
    return this.http.get(url, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  obtenerSolicitud(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/solicitudes/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  actualizarEstadoSolicitud(id: number, estado: string): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/solicitudes/${id}`, 
      { estado },
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  eliminarSolicitud(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/solicitudes/${id}`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  // ==================== HELPERS ====================
  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (this.authToken) {
      headers = headers.set('Authorization', `Bearer ${this.authToken}`);
    }

    return headers;
  }

  private saveToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('auth_token', token);
  }

  private loadToken(): void {
    this.authToken = localStorage.getItem('auth_token');
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Ocurrió un error';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Código: ${error.status}\nMensaje: ${error.message}`;
      
      // Manejo específico de errores de autenticación
      if (error.status === 401) {
        this.logout();
      }
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}