import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable, of } from 'rxjs';

interface Solicitud {
  id?: number;
  datosPersonales: any;
  datosLaborales: any;
  datosPrestamo: any;
  //foto: string | ArrayBuffer | null;
  fotoUrl?: string; // Cambiamos a solo guardar la URL
   firmaUrl?: string; // Nueva propiedad para la URL de la firma
  estado?: 'pendiente' | 'aprobada' | 'rechazada';
  fechaSolicitud?: string;
  totalIngresos?: number; // Nuevo campo para total ingresos
  totalEgresos?: number;  // Nuevo campo para total egresos
   publicIdFoto?: string; // Nuevo campo para ID de imagen en Cloudinary
  publicIdFirma?: string; // Nuevo campo para ID de firma en Cloudinary
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
private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dhppgme51/upload'; // Reemplaza con tus datos
private cloudinaryUploadPreset = 'bankexample'; // Configura esto en tu cuenta Cloudinary


private cloudinaryApiKey = '358666426617984'; // Agrega tu API key
  private cloudinaryApiSecret = 'x2MEnc5UMnlUjXi3CnMi5bef9VE'; // Agrega tu API secret

  private headers = new HttpHeaders({
    'X-Master-Key': '$2a$10$e/ZKipahdSOxDSEGbD/unOViwY.DjYxAlB3Ynzqh1US6k9fuuO0N2', // Reemplaza con tu Master Key
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }


   uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.cloudinaryUploadPreset);

    return this.http.post<any>(this.cloudinaryUrl, formData).pipe(
      map(response => response.secure_url)
    );
  }


uploadFile(file: File | Blob, type: 'image' | 'signature'): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.cloudinaryUploadPreset);
    
    // Opcional: agregar tags para identificar el tipo
    formData.append('tags', type);

    return this.http.post<any>(this.cloudinaryUrl, formData).pipe(
      map(response => response.secure_url)
    );
  }

  private getBinData(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.headers });
  }

  private updateBinData(data: any): Observable<any> {
    return this.http.put(this.apiUrl, data, { headers: this.headers });
  }
/*
  // Obtener todos los datos del Bin
  private getBinData(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.headers });
  }

  // Actualizar todos los datos del Bin
  private updateBinData(data: any): Observable<any> {
    return this.http.put(this.apiUrl, data, { headers: this.headers });
  }*/

  // Solicitudes
  /*  
  crearSolicitud(solicitud: Solicitud, imageFile?: File): Observable<Solicitud> {
    // Si hay imagen, la subimos primero
    const upload$ = imageFile ? 
      this.uploadImage(imageFile) : 
      new Observable<string>(subscriber => subscriber.next(''));

    return upload$.pipe(
      mergeMap(imageUrl => {
        solicitud.fotoUrl = imageUrl || undefined;
        solicitud.fechaSolicitud = new Date().toISOString();
        solicitud.estado = 'pendiente';
        solicitud.id = Date.now();

        return this.getBinData().pipe(
          mergeMap((response: any) => {
            const data = response.record || {};
            const updatedData = {
              ...data,
              solicitudes: [...(data.solicitudes || []), solicitud]
            };

            return this.updateBinData(updatedData).pipe(
              map(() => solicitud)
            );
          })
        );
      })
    );
  }


  */
 crearSolicitud(
    solicitudData: any, 
    imageFile?: File, 
    signatureData?: string
  ): Observable<Solicitud> {
    // Preparar observables para subir archivos
    const uploads: Observable<string>[] = [];
    
    if (imageFile) {
      uploads.push(this.uploadFile(imageFile, 'image'));
    } else {
      uploads.push(of(''));
    }

    if (signatureData) {
      // Convertir base64 a Blob
      const blob = this.dataURItoBlob(signatureData);
      uploads.push(this.uploadFile(blob, 'signature'));
    } else {
      uploads.push(of(''));
    }

    return forkJoin(uploads).pipe(
      mergeMap(([imageUrl, signatureUrl]) => {
        const nuevaSolicitud: Solicitud = {
          ...solicitudData,
          fotoUrl: imageUrl || undefined,
          firmaUrl: signatureUrl || undefined,
          totalIngresos: solicitudData.datosPrestamo.totalIngresos,
          totalEgresos: solicitudData.datosPrestamo.totalEgresos,
          fechaSolicitud: new Date().toISOString(),
          estado: 'pendiente',
          id: Date.now()
        };

        return this.getBinData().pipe(
          mergeMap((response: any) => {
            const data = response.record || {};
            const updatedData = {
              ...data,
              solicitudes: [...(data.solicitudes || []), nuevaSolicitud]
            };

            return this.updateBinData(updatedData).pipe(
              map(() => nuevaSolicitud)
            );
          })
        );
      })
    );
  }

   private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    
    return new Blob([ab], { type: mimeString });
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



  async descargarPlantillaExcel(): Promise<ArrayBuffer> {
  // Aquí deberías cargar tu plantilla DiseñoSoli.xlsx desde assets o un servidor
  const response = await this.http.get('assets/DiseñoSoli.xlsx', { 
    responseType: 'arraybuffer' 
  }).toPromise();
  
  if (!response) {
    throw new Error('No se pudo cargar la plantilla');
  }
  return response;
}








deleteCloudinaryImage(publicId: string): Observable<any> {
    const timestamp = Date.now();
    const signature = this.generateCloudinarySignature(publicId, timestamp);
    
    return this.http.post(`${this.cloudinaryUrl}/image/destroy`, {
      public_id: publicId,
      signature: signature,
      api_key: this.cloudinaryApiKey,
      timestamp: timestamp
    });
  }

  private generateCloudinarySignature(publicId: string, timestamp: number): string {
    const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}${this.cloudinaryApiSecret}`;
    return this.sha1(paramsToSign);
  }

  private sha1(input: string): string {
    // Implementación simple de SHA1 (puedes usar una librería)
    // Nota: En producción usa crypto-js o similar
    return input; // Reemplaza con implementación real
  }
  eliminarSolicitudCompleta(solicitud: Solicitud): Observable<any> {
    const deleteRequests: Observable<any>[] = [
      this.deleteSolicitudFromBin(solicitud.id!)
    ];

    if (solicitud.publicIdFoto) {
      deleteRequests.push(this.deleteCloudinaryImage(solicitud.publicIdFoto));
    }

    if (solicitud.publicIdFirma) {
      deleteRequests.push(this.deleteCloudinaryImage(solicitud.publicIdFirma));
    }

    return forkJoin(deleteRequests);
  }

  private deleteSolicitudFromBin(id: number): Observable<any> {
    return this.getBinData().pipe(
      mergeMap((response: any) => {
        const data = response.record || {};
        const updatedSolicitudes = data.solicitudes?.filter((s: Solicitud) => s.id !== id) || [];
        
        const updatedData = {
          ...data,
          solicitudes: updatedSolicitudes
        };

        return this.updateBinData(updatedData);
      })
    );
  }





}