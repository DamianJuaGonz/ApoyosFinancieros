import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject,Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
 
import { saveAs } from 'file-saver';
// En admin.service.ts
 

@Injectable({
  providedIn: 'root'
})
 

 
export class adminpanelservice {
 private apiUrl = 'https://apoyosfinancieros.com.mx/api/admin/admin.php';
 //private apiUrl = environment.apiUrl + '/admin'; // Asegúrate de configurar tu environment.ts
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    // Verificar si hay un token al iniciar
    this.loggedIn.next(!!localStorage.getItem('auth_token'));
  }

  // Métodos de autenticación
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('auth_token', response.token);
          this.loggedIn.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.loggedIn.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Métodos para solicitudes
  getSolicitudes(estado?: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/solicitudes?estado=${estado || ''}`);
  }

  getSolicitudById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/solicitudes/${id}`);
  }

  changeSolicitudStatus(id: number, estado: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/solicitudes/cambiar-estado`, {
      id,
      estado
    });
  }

  deleteSolicitud(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/solicitudes/${id}`);
  }
}