import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
 
import { saveAs } from 'file-saver';

interface Solicitud {
  id?: number;
  datos_personales: any;
  datos_laborales: any;
  datos_prestamo: any;
  estado?: 'pendiente' | 'aprobada' | 'rechazada';
  fecha_solicitud?: string;
  total_ingresos?: number;
  total_egresos?: number;
  imagenes?: {
    foto?: string;
    firma?: string;
    ubicacion_casa?: string;
    ubicacion_trabajo?: string;
  };
}

interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: number;
    username: string;
  };
}

@Injectable({
  providedIn: 'root'
})
 

 
export class adminpanelservice {
  private apiUrl = 'https://apoyosfinancieros.com.mx/api/admin';
  private authToken: string | null = null;

  constructor(private http: HttpClient) { }

  // ==================== AUTENTICACIÓN ====================
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login.php`, { username, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          this.authToken = response.token;
          localStorage.setItem('admin_token', response.token);
        }
      })
    );
  }

  logout(): void {
    this.authToken = null;
    localStorage.removeItem('admin_token');
  }

  isAuthenticated(): boolean {
    return !!this.authToken || !!localStorage.getItem('admin_token');
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.authToken || localStorage.getItem('admin_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // ==================== SOLICITUDES ====================
  getSolicitudes(estado?: string): Observable<any[]> {
    const url = estado ? `${this.apiUrl}/solicitudes.php?estado=${estado}` : `${this.apiUrl}/solicitudes.php`;
    return this.http.get<any[]>(url, { headers: this.getAuthHeaders() });
  }

  getSolicitudById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/solicitud.php?id=${id}`, { headers: this.getAuthHeaders() });
  }

  cambiarEstadoSolicitud(id: number, estado: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/solicitud.php`, 
      { id, estado },
      { headers: this.getAuthHeaders() }
    );
  }

  // ==================== REPORTES ====================
  descargarPlantillaExcel(): Observable<ArrayBuffer> {
    return this.http.get(`${this.apiUrl}/plantilla.xlsx`, {
      headers: this.getAuthHeaders(),
      responseType: 'arraybuffer'
    });
  }

  generarReporteExcel(filtros: any): Observable<ArrayBuffer> {
    return this.http.post(`${this.apiUrl}/reporte.php`, filtros, {
      headers: this.getAuthHeaders(),
      responseType: 'arraybuffer'
    });
  }

  // ==================== UTILIDADES ====================
  descargarArchivo(buffer: ArrayBuffer, nombreArchivo: string): void {
    saveAs(new Blob([buffer]), nombreArchivo);
  }
}