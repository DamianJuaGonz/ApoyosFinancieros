import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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

  private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }),
  withCredentials: true // Para manejar cookies si es necesario
};
  constructor(private http: HttpClient) { }

  // ==================== AUTENTICACIÓN ====================
login(username: string, password: string): Observable<any> {
  const url = `${this.apiUrl}/login.php`;
  console.log('URL de solicitud:', url);
  
  return this.http.post(url, { username, password }, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    observe: 'response' // Para ver toda la respuesta
  }).pipe(
    tap(response => {
      console.log('Respuesta exitosa:', {
        status: response.status,
        body: response.body,
        headers: response.headers
      });
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('Error completo:', {
        url: error.url,
        status: error.status,
        statusText: error.statusText,
        headers: error.headers,
        error: error.error, // Este contiene la respuesta del servidor
        message: error.message,
        name: error.name
      });
      
      // Si el servidor devolvió un mensaje de error, mostrarlo
      if (error.error && error.error.message) {
        console.error('Mensaje del servidor:', error.error.message);
        if (error.error.error) {
          console.error('Error técnico:', error.error.error);
        }
      }
      
      return throwError(() => error);
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
// En admin.service.ts

getSolicitudes(estado?: string): Observable<any[]> {
  const url = estado ? `${this.apiUrl}/solicitudes.php?estado=${estado}` : `${this.apiUrl}/solicitudes.php`;
  
  console.log('URL de solicitudes:', url); // Para depuración
  
  return this.http.get<any[]>(url, { 
    headers: this.getAuthHeaders(),
    observe: 'response' // Para obtener toda la respuesta
  }).pipe(
    tap(response => {
      console.log('Respuesta completa:', {
        status: response.status,
        headers: response.headers,
        body: response.body
      });
    }),
    map(response => response.body || []),
    catchError((error: HttpErrorResponse) => {
      console.error('Error al cargar solicitudes:', {
        url: error.url,
        status: error.status,
        statusText: error.statusText,
        error: error.error,
        headers: error.headers
      });
      return throwError(() => this.parseSolicitudesError(error));
    })
  );
}

private parseSolicitudesError(error: HttpErrorResponse): string {
  if (error.status === 0) {
    return 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
  }
  
  if (error.status === 401) {
    return 'Sesión expirada. Por favor inicia sesión nuevamente.';
  }
  
  if (error.status === 500) {
    return 'Error interno del servidor al cargar solicitudes.';
  }
  
  return `Error al cargar solicitudes: ${error.statusText || 'Error desconocido'}`;
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