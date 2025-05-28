import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';

interface Solicitud {
  id?: number;
  datosPersonales: any;
  datosLaborales: any;
  datosPrestamo: any;
  foto: string | ArrayBuffer | null;
  estado?: 'pendiente' | 'aprobada' | 'rechazada';
  fechaSolicitud?: string;
}

interface Admin {
  id?: number;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  private binId = '683743888561e97a501cb14a'; // Reemplaza con tu Bin ID de JSONBin.io
  private apiUrl = `https://api.jsonbin.io/v3/b/${this.binId}`;
  private headers = new HttpHeaders({
    'X-Master-Key': '$2a$10$e/ZKipahdSOxDSEGbD/unOViwY.DjYxAlB3Ynzqh1US6k9fuuO0N2', // Reemplaza con tu Master Key
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  // Obtener todos los datos del Bin
  private getBinData(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.headers });
  }

  // Actualizar todos los datos del Bin
  private updateBinData(data: any): Observable<any> {
    return this.http.put(this.apiUrl, data, { headers: this.headers });
  }

  // Solicitudes
  crearSolicitud(solicitud: Solicitud): Observable<Solicitud> {
    return this.getBinData().pipe(
      mergeMap((response: any) => {
        const data = response.record || {};
        solicitud.fechaSolicitud = new Date().toISOString();
        solicitud.estado = 'pendiente';
        solicitud.id = Date.now(); // ID único

        const updatedData = {
          ...data,
          solicitudes: [...(data.solicitudes || []), solicitud]
        };

        return this.updateBinData(updatedData).pipe(
          map(() => solicitud)
        );
      })
    );
  }

  obtenerSolicitudes(): Observable<Solicitud[]> {
    return this.getBinData().pipe(
      map((response: any) => response.record?.solicitudes || [])
    );
  }

  aprobarSolicitud(id: number): Observable<Solicitud> {
    return this.getBinData().pipe(
      mergeMap((response: any) => {
        const data = response.record || {};
        const solicitud = data.solicitudes?.find((s: Solicitud) => s.id === id);
        
        if (!solicitud) {
          throw new Error('Solicitud no encontrada');
        }

        const solicitudAprobada = { ...solicitud, estado: 'aprobada' };
        const updatedSolicitudes = data.solicitudes?.filter((s: Solicitud) => s.id !== id) || [];
        const updatedAprobadas = [...(data.solicitudesAceptadas || []), solicitudAprobada];

        const updatedData = {
          ...data,
          solicitudes: updatedSolicitudes,
          solicitudesAceptadas: updatedAprobadas
        };

        return this.updateBinData(updatedData).pipe(
          map(() => solicitudAprobada)
        );
      })
    );
  }

  rechazarSolicitud(id: number): Observable<any> {
    return this.getBinData().pipe(
      mergeMap((response: any) => {
        const data = response.record || {};
        const updatedSolicitudes = data.solicitudes?.map((s: Solicitud) => 
          s.id === id ? { ...s, estado: 'rechazada' } : s
        ) || [];

        const updatedData = {
          ...data,
          solicitudes: updatedSolicitudes
        };

        return this.updateBinData(updatedData);
      })
    );
  }

  // Administradores
  login(username: string, password: string): Observable<Admin[]> {
    return this.getBinData().pipe(
      map((response: any) => {
        const admins = response.record?.admins || [];
        return admins.filter((admin: Admin) => 
          admin.username === username && admin.password === password
        );
      })
    );
  }

  obtenerSolicitudesAprobadas(): Observable<Solicitud[]> {
    return this.getBinData().pipe(
      map((response: any) => response.record?.solicitudesAceptadas || [])
    );
  }
}