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
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
interface ImagenSolicitud {
  tipo: 'foto' | 'firma' | 'ubicacion_casa' | 'ubicacion_trabajo';
  base64: string;
  mime_type?: string;
}
@Injectable({
  providedIn: 'root'
})
export class CreditService {
  private apiUrl = 'https://apoyosfinancieros.com.mx/api/solicitudes.php'; // Cambiar a localhost en desarrollo si es necesario

  constructor(private http: HttpClient) { }

  crearSolicitud(datosSolicitud: any, imagenes: any[]): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }),
        withCredentials: true
    };

    // Preparar los datos para enviar
    const datosPersonales = this.prepararDatosPersonales(datosSolicitud);
    const datosLaborales = this.prepararDatosLaborales(datosSolicitud);
    const datosPrestamo = this.prepararDatosPrestamo(datosSolicitud);

    // Calcular totales
    const totalIngresos = this.calcularTotalIngresos(datosSolicitud);
    const totalEgresos = this.calcularTotalEgresos(datosSolicitud);

    // Crear payload
    const payload = {
      datos_personales: datosPersonales,
      datos_laborales: datosLaborales,
      datos_prestamo: datosPrestamo,
      total_ingresos: totalIngresos,
      total_egresos: totalEgresos,
      imagenes: imagenes
    };

    return this.http.post(this.apiUrl, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  return this.http.post(this.apiUrl, payload, httpOptions);
}

  private prepararDatosPersonales(datos: any): any {
    return {
      nombre: datos.nombre,
      apellido_paterno: datos.apellidoPaterno,
      apellido_materno: datos.apellidoMaterno,
      curp: datos.curp,
      telefono: datos.telefono,
      email: datos.email,
      direccion: {
        calle: datos.calle,
        numero: datos.numero,
        colonia: datos.colonia,
        localidad: datos.localidad,
        cp: datos.cp,
        estado: datos.estado
      },
      vivienda: datos.vivienda,
      antiguedad_vivienda: datos.antiguedadVivienda,
      estado_civil: datos.EstadoCivil,
      conyuge: datos.conyuge,
      telefono_conyuge: datos.TelefonoCON,
      ocupacion_conyuge: datos.OcupacionC,
      hijos: datos.hijos,
      vehiculo: datos.vehiculo
    };
  }

  private prepararDatosLaborales(datos: any): any {
    return {
      direccion: datos.direccionTrabajo,
      puesto: datos.puesto,
      antiguedad: datos.antiguedad,
      telefono: datos.telefonoTrabajo
    };
  }

  private prepararDatosPrestamo(datos: any): any {
    return {
      monto: datos.monto,
      plazo: datos.plazo,
      proposito: datos.proposito,
      descripcion_ingresos_extra: datos.descripcionIngresosExtra,
      aval: {
        nombre: datos.avalNombre,
        telefono: datos.avalTelefono,
        direccion: {
          calle: datos.avalCalle,
          numero: datos.avalNumero,
          colonia: datos.avalColonia,
          localidad: datos.avalLocalidad,
          cp: datos.avalCP,
          estado: datos.avalEstado
        },
        ocupacion: datos.avalOcupacion,
        tiempo_conocido: datos.avalTiempoConocido
      },
      referencia: {
        nombre: datos.referenciaNombre,
        telefono: datos.referencialTelefono,
        direccion: {
          calle: datos.referenciaCalle,
          numero: datos.referenciaNumero,
          colonia: datos.referenciaColonia,
          localidad: datos.referenciaLocalidad,
          cp: datos.referenciaCP,
          estado: datos.referenciaEstado
        },
        ocupacion: datos.referenciaOcupacion,
        tiempo_conocido: datos.referenciaTiempoConocido
      }
    };
  }

  private calcularTotalIngresos(datos: any): number {
    const ingresosExtra = datos.ingresosExtra || 0;
    const gananciasNegocio = datos.gananciasNegocio || 0;
    return Number(ingresosExtra) + Number(gananciasNegocio);
  }

  private calcularTotalEgresos(datos: any): number {
    const gastosServiciosHogar = datos.gastosServiciosHogar || 0;
    const gastosComidaVestido = datos.gastosComidaVestido || 0;
    const gastosRentaVivienda = datos.gastosRentaVivienda || 0;
    const otrosGastosPersonales = datos.otrosGastosPersonales || 0;
    const gastosServiciosNegocio = datos.gastosServiciosNegocio || 0;
    const gastosRentaNegocio = datos.gastosRentaNegocio || 0;
    const inversionNegocio = datos.inversionNegocio || 0;

    return (
      Number(gastosServiciosHogar) +
      Number(gastosComidaVestido) +
      Number(gastosRentaVivienda) +
      Number(otrosGastosPersonales) +
      Number(gastosServiciosNegocio) +
      Number(gastosRentaNegocio) +
      Number(inversionNegocio)
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