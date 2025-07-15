/*import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';

 
// Interfaces mejor definidas
interface DatosPersonales {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  curp: string;
  telefono: string;
  email: string;
  vivienda: string;
  antiguedadVivienda: string;
  direccion: {
    calle: string;
    numero: string;
    colonia: string;
    localidad: string;
    cp: string;
    estado: string;
  };
  estadoCivil: string;
  conyuge: {
    nombre: string;
    telefono: string;
    ocupacion: string;
  };
  hijos: number;
  vehiculo: boolean;
}

interface DatosLaborales {
  direccionTrabajo: string;
  puesto: string;
  antiguedad: string;
  telefonoTrabajo: string;
}

interface DatosPrestamo {
  monto: number;
  plazo: string;
  proposito: string;
  ingresosExtra: number;
  descripcionIngresosExtra: string;
  gananciasNegocio: number;
  gastosServiciosHogar: number;
  gastosComidaVestido: number;
  gastosRentaVivienda: number;
  otrosGastosPersonales: number;
  gastosServiciosNegocio: number;
  gastosRentaNegocio: number;
  inversionNegocio: number;
  Valormercancia: number;
  avalNombre: string;
  avalTelefono: string;
  avalCalle: string;
  avalNumero: string;
  avalColonia: string;
  avalLocalidad: string;
  avalCP: string;
  avalEstado: string;
  avalOcupacion: string;
  avalTiempoConocido: string;
  referenciaNombre: string;
  referencialTelefono: string;
  referenciaCalle: string;
  referenciaNumero: string;
  referenciaColonia: string;
  referenciaLocalidad: string;
  referenciaCP: string;
  referenciaEstado: string;
  referenciaOcupacion: string;
  referenciaTiempoConocido: string;
}

interface ImagenSolicitud {
  tipo: 'foto' | 'firma' | 'ubicacion_casa' | 'ubicacion_trabajo';
  base64: string;
  mime_type?: string;
}

interface Solicitud {
  id?: number;
  datos_personales: DatosPersonales;
  datos_laborales: DatosLaborales;
  datos_prestamo: DatosPrestamo;
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

interface Admin {
  id?: number;
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: number;
    username: string;
  };
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}*/
/*
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface ImagenSolicitud {
  tipo: 'foto' | 'firma' | 'ubicacion_casa' | 'ubicacion_trabajo';
  base64: string;
  mime_type?: string;
}

interface ImagenSolicitud {
  tipo: 'foto' | 'firma' | 'ubicacion_casa' | 'ubicacion_trabajo';
  base64: string;
  
}*/
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ImagenSolicitud {
  tipo: 'foto' | 'firma' | 'ubicacion_casa' | 'ubicacion_trabajo';
  base64: string;
  mime_type?: string;
}

export interface SolicitudData {
  // Datos personales
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  curp: string;
  telefono: string;
  email: string;
  vivienda: string;
  antiguedadVivienda: string;
  calle: string;
  numero: string;
  colonia: string;
  localidad: string;
  cp: string;
  estado: string;
  EstadoCivil: string;
  conyuge: string;
  TelefonoCON: string;
  OcupacionC: string;
  hijos: number;
  vehiculo: string;
  
  // Datos laborales
  direccionTrabajo: string;
  puesto: string;
  antiguedad: string;
  telefonoTrabajo: string;
  
  // Datos del préstamo
  monto: string;
  plazo: string;
  proposito: string;
  descripcionIngresosExtra: string;
  ingresosExtra: number;
  gananciasNegocio: number;
  gastosServiciosHogar: number;
  gastosComidaVestido: number;
  gastosRentaVivienda: number;
  otrosGastosPersonales: number;
  gastosServiciosNegocio: number;
  gastosRentaNegocio: number;
  inversionNegocio: number;
  Valormercancia: number;
  
  // Aval
  avalNombre: string;
  avalTelefono: string;
  avalCalle: string;
  avalNumero: string;
  avalColonia: string;
  avalLocalidad: string;
  avalCP: string;
  avalEstado: string;
  avalOcupacion: string;
  avalTiempoConocido: string;
  
  // Referencia
  referenciaNombre: string;
  referencialTelefono: string;
  referenciaCalle: string;
  referenciaNumero: string;
  referenciaColonia: string;
  referenciaLocalidad: string;
  referenciaCP: string;
  referenciaEstado: string;
  referenciaOcupacion: string;
  referenciaTiempoConocido: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  private apiUrl = 'https://apoyosfinancieros.com.mx/api';
  private authToken: string | null = null;

  constructor(private http: HttpClient) {
    this.loadToken();
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
/*
  private handleError(error: any): Observable<never> {
    console.error('Error en el servicio:', error);
    let errorMessage = 'Ocurrió un error en la solicitud';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código: ${error.status}\nMensaje: ${error.message}`;
      
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
*/
  crearSolicitud(solicitudData: any, imagenes: any[]): Observable<any> {
    const formData = new FormData();
    
    // Convertir JSON a strings y añadir al FormData
    formData.append('datos_personales', JSON.stringify(this.extraerDatosPersonales(solicitudData)));
    formData.append('datos_laborales', JSON.stringify(this.extraerDatosLaborales(solicitudData)));
    formData.append('datos_prestamo', JSON.stringify(this.extraerDatosPrestamo(solicitudData)));
    
    // Añadir imágenes al FormData
    imagenes.forEach((imagen, index) => {
      const blob = this.convertBase64ToBlob(imagen.base64);
      formData.append(`imagenes[${index}][tipo]`, imagen.tipo);
      formData.append(`imagenes[${index}][imagen]`, blob, `${imagen.tipo}_${Date.now()}.${this.getFileExtension(imagen.base64)}`);
    });

    return this.http.post(`${this.apiUrl}/solicitudes/crear`, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  private convertBase64ToBlob(base64Data: string): Blob {
    // Separar el tipo MIME de los datos base64
    const parts = base64Data.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  private getFileExtension(base64Data: string): string {
    const mime = base64Data.split(';')[0].split(':')[1];
    switch (mime) {
      case 'image/png': return 'png';
      case 'image/jpeg': return 'jpg';
      case 'image/jpg': return 'jpg';
      case 'image/svg+xml': return 'svg';
      default: return 'png';
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
      if (error.error?.message) {
        errorMessage += ` | Detalles: ${error.error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  private extraerDatosPersonales(formData: SolicitudData): any {
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
      },
      estadoCivil: formData.EstadoCivil,
      conyuge: {
        nombre: formData.conyuge,
        telefono: formData.TelefonoCON,
        ocupacion: formData.OcupacionC
      },
      hijos: formData.hijos,
      vehiculo: formData.vehiculo
    };
  }

  private extraerDatosLaborales(formData: SolicitudData): any {
    return {
      direccionTrabajo: formData.direccionTrabajo,
      puesto: formData.puesto,
      antiguedad: formData.antiguedad,
      telefonoTrabajo: formData.telefonoTrabajo
    };
  }

  private extraerDatosPrestamo(formData: SolicitudData): any {
    return {
      monto: formData.monto,
      plazo: formData.plazo,
      proposito: formData.proposito,
      ingresosExtra: formData.ingresosExtra,
      descripcionIngresosExtra: formData.descripcionIngresosExtra,
      gananciasNegocio: formData.gananciasNegocio,
      gastosServiciosHogar: formData.gastosServiciosHogar,
      gastosComidaVestido: formData.gastosComidaVestido,
      gastosRentaVivienda: formData.gastosRentaVivienda,
      otrosGastosPersonales: formData.otrosGastosPersonales,
      gastosServiciosNegocio: formData.gastosServiciosNegocio,
      gastosRentaNegocio: formData.gastosRentaNegocio,
      inversionNegocio: formData.inversionNegocio,
      Valormercancia: formData.Valormercancia,
      // Datos del aval
      avalNombre: formData.avalNombre,
      avalTelefono: formData.avalTelefono,
      avalCalle: formData.avalCalle,
      avalNumero: formData.avalNumero,
      avalColonia: formData.avalColonia,
      avalLocalidad: formData.avalLocalidad,
      avalCP: formData.avalCP,
      avalEstado: formData.avalEstado,
      avalOcupacion: formData.avalOcupacion,
      avalTiempoConocido: formData.avalTiempoConocido,
      // Referencia personal
      referenciaNombre: formData.referenciaNombre,
      referencialTelefono: formData.referencialTelefono,
      referenciaCalle: formData.referenciaCalle,
      referenciaNumero: formData.referenciaNumero,
      referenciaColonia: formData.referenciaColonia,
      referenciaLocalidad: formData.referenciaLocalidad,
      referenciaCP: formData.referenciaCP,
      referenciaEstado: formData.referenciaEstado,
      referenciaOcupacion: formData.referenciaOcupacion,
      referenciaTiempoConocido: formData.referenciaTiempoConocido
    };
  }

  // Métodos adicionales que podrías necesitar
  obtenerSolicitudes(estado?: string): Observable<any> {
    const url = estado ? `${this.apiUrl}/solicitudes?estado=${estado}` : `${this.apiUrl}/solicitudes`;
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
 


































  
  // ========== MÉTODOS ADICIONALES ==========
  async descargarPlantillaExcel(): Promise<ArrayBuffer> {
    try {
      const response = await this.http.get('assets/DiseñoSoli.xlsx', {
        responseType: 'arraybuffer'
      }).toPromise();
      
      if (!response) {
        throw new Error('No se pudo cargar la plantilla');
      }
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  procesarImagen(file: File, tipo: 'foto' | 'firma' | 'ubicacion_casa' | 'ubicacion_trabajo'): Promise<ImagenSolicitud> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event: any) => {
        resolve({
          tipo: tipo,
          base64: event.target.result.split(',')[1],
          mime_type: file.type
        });
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
      
      reader.readAsDataURL(file);
    });
  }
}