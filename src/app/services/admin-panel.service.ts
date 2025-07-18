import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
  
import { saveAs } from 'file-saver';
// En admin.service.ts
export interface ReplaceResponse {
  success: boolean;
  message?: string;
  nuevo_id: number;
  estado: string;
}
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
  token: string;
  username: string;
  message?: string;
  error?: string;
  status?: boolean;
}


@Injectable({
  providedIn: 'root'
})
 

 
export class adminpanelservice {
 private apiUrl = 'https://apoyosfinancieros.com.mx/api/admin/admin.php';
 //private apiUrl = environment.apiUrl + '/admin'; // Asegúrate de configurar tu environment.ts
  private authToken: string | null = null;
  private currentUser: any = null;
  constructor(private http: HttpClient) { }

  // ==================== AUTENTICACIÓN ====================
login(username: string, password: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
    tap((response: any) => {
      if (response.token && response.user) {
        // Almacenar en localStorage
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('admin_user', JSON.stringify(response.user));
        
        // También almacenar en el servicio para acceso rápido
        this.currentUser = response.user;
        this.authToken = response.token;
      }
    }),
    catchError(error => {
      console.error('Error en login:', error);
      return throwError(() => error);
    })
  );
}

  logout(): void {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_data');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('admin_token');
  }

getAuthHeaders(): HttpHeaders {
  const token = localStorage.getItem('auth_token') || this.authToken;
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  return new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
}

  // ==================== SOLICITUDES ====================
getSolicitudes(estado?: string): Observable<any[]> {
  const headers = this.getAuthHeaders();
  let url = `${this.apiUrl}/solicitudes`;
  if (estado) {
    url += `?estado=${encodeURIComponent(estado)}`;
  }
  
  return this.http.get<any[]>(url, { headers }).pipe(
    catchError(error => {
      console.error('Error al obtener solicitudes:', error);
      if (error.status === 401) {
        this.logout(); // Cerrar sesión si el token es inválido
      }
      return throwError(() => error);
    })
  );
}

  getSolicitudById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/solicitudes/${id}`, { headers: this.getAuthHeaders() });
  }





getCurrentUser(): any {
  return this.currentUser;
}

// Obtener el token actual
getToken(): string | null {
  return this.authToken || localStorage.getItem('auth_token');
}

// Verificar si está autenticado
 








replaceSolicitud(id: number, estado: string): Observable<{nuevo_id: number, estado: string}> {
  const headers = this.getAuthHeaders();
  
  return this.http.post<{nuevo_id: number, estado: string}>(
    `${this.apiUrl}/solicitudes/replace`,
    { id, estado },
    { headers }
  ).pipe(
    catchError(error => {
      console.error('Error al reemplazar solicitud:', error);
      return throwError(() => new Error('Error al procesar la solicitud'));
    })
  );
}





















changeSolicitudStatus(id: number, estado: string): Observable<any> {
  const headers = this.getAuthHeaders();
  
  return this.http.post(
    `${this.apiUrl}/solicitudes/${id}/recrear`,
    { nuevo_estado: estado },
    { headers }
  ).pipe(
    catchError(error => {
      console.error('Error al recrear solicitud:', error);
      return throwError(() => error);
    })
  );
}
  deleteSolicitud(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/solicitudes/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  // ==================== EXCEL ====================
  downloadExcelTemplate(): Observable<ArrayBuffer> {
    return this.http.get(`${this.apiUrl}/excel-template`, {
      headers: this.getAuthHeaders(),
      responseType: 'arraybuffer'
    });
  }

  // ==================== ESTADÍSTICAS ====================
  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`, { headers: this.getAuthHeaders() });
  }







  // ==================== EXPORTACIÓN ====================
  descargarPlantillaExcel(): Observable<ArrayBuffer> {
    return this.http.get(`${this.apiUrl}/plantilla.xlsx`, {
      headers: this.getAuthHeaders(),
      responseType: 'arraybuffer'
    });
  }

  generarReporteCompleto(): Observable<ArrayBuffer> {
    return this.http.get(`${this.apiUrl}/reporte.php`, {
      headers: this.getAuthHeaders(),
      responseType: 'arraybuffer'
    });
  }
}