import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

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
export class CreditApiService {
  private apiUrl = 'https://apoyosfinancieros.com.mx/api';
  private authToken: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.loadToken();
  }

  // ==================== MÉTODOS DE AUTENTICACIÓN ====================

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/admin/login`, { username, password }).pipe(
      tap(response => {
        if (response.success) {
          this.storeToken(response.token);
        }
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

  // ==================== MÉTODOS DE SOLICITUDES ====================

  crearSolicitud(solicitudData: any, imagenes: any[]): Observable<any> {
    const data = {
      datos_personales: this.extraerDatosPersonales(solicitudData),
      datos_laborales: this.extraerDatosLaborales(solicitudData),
      datos_prestamo: this.extraerDatosPrestamo(solicitudData),
      imagenes: imagenes
    };

    return this.http.post(`${this.apiUrl}/solicitudes/crear`, data, { 
      headers: this.getAuthHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  obtenerSolicitudes(estado?: string): Observable<Solicitud[]> {
    const url = estado ? `${this.apiUrl}/solicitudes?estado=${estado}` : `${this.apiUrl}/solicitudes`;
    return this.http.get<Solicitud[]>(url, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  obtenerSolicitud(id: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.apiUrl}/solicitudes/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  actualizarEstadoSolicitud(id: number, estado: 'aprobada' | 'rechazada'): Observable<any> {
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

  // ==================== MÉTODOS PRIVADOS ====================

  private storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
    this.authToken = token;
  }

  private loadToken(): void {
    this.authToken = localStorage.getItem('auth_token');
  }

  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (this.authToken) {
      headers = headers.set('Authorization', `Bearer ${this.authToken}`);
    }

    return headers;
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Ocurrió un error';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Código: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // ==================== HELPERS PARA DATOS ====================

  private extraerDatosPersonales(formData: any): any {
    return {
      nombre: formData.nombre,
      apellidoPaterno: formData.apellidoPaterno,
      apellidoMaterno: formData.apellidoMaterno,
      curp: formData.curp,
      telefono: formData.telefono,
      email: formData.email,
      vivienda: formData.vivienda,
      antiguedadVivienda: formData.antiguedadVivienda,
      direccion: {
        calle: formData.calle,
        numero: formData.numero,
        colonia: formData.colonia,
        localidad: formData.localidad,
        cp: formData.cp,
        estado: formData.estado
      }
    };
  }

  private extraerDatosLaborales(formData: any): any {
    return {
      direccionTrabajo: formData.direccionTrabajo,
      puesto: formData.puesto,
      antiguedad: formData.antiguedad,
      telefonoTrabajo: formData.telefonoTrabajo
    };
  }

  private extraerDatosPrestamo(formData: any): any {
    return {
      monto: formData.monto,
      plazo: formData.plazo,
      proposito: formData.proposito,
      ingresosExtra: formData.ingresosExtra,
      gananciasNegocio: formData.gananciasNegocio,
      gastosServiciosHogar: formData.gastosServiciosHogar,
      gastosComidaVestido: formData.gastosComidaVestido
    };
  }
}