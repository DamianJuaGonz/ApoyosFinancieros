import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import SignaturePad from 'signature_pad';
import { CreditService } from '../services/credit.service'; // Importar el servicio
import { finalize } from 'rxjs';
export interface ImagenSolicitud {
  tipo: 'foto' | 'firma' | 'ubicacion_casa' | 'ubicacion_trabajo';
  base64: string;
  mime_type?: string;
}

@Component({
  selector: 'app-credit-application',
  templateUrl: './credit-application.component.html',
  styleUrls: ['./credit-application.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class CreditApplicationComponent implements OnInit {
  @ViewChild('signaturePad', { static: true }) signaturePadElement!: ElementRef;
  signaturePad!: SignaturePad;
  
  creditForm: FormGroup;
  isLoading = false;
  
  // Propiedades para previsualización
  profileImagePreview: string | null = null;
  ubicacionCasaPreview: string | null = null;
  ubicacionTrabajoPreview: string | null = null;
  signaturePreview: string | null = null;

  // Archivos de imagen para enviar al servidor
  private imageFiles: {
    foto?: File;
    ubicacionCasa?: File;
    ubicacionTrabajo?: File;
  } = {};

  constructor(
    private fb: FormBuilder,
    private creditService: CreditService // Inyectar el servicio
  ) {
    this.creditForm = this.fb.group({
      // Datos personales (agregar validadores según necesidad)
            // Datos personales
      nombre: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      curp: [''],
      telefono: [''],
      email: [''],
      vivienda: [''],
      antiguedadVivienda: [''],
      calle: [''],
      numero: [''],
      colonia: [''],
      localidad: [''],
      cp: [''],
      estado: [''],
      EstadoCivil: [''],
      conyuge: [''],
      TelefonoCON: [''],
      OcupacionC: [''],
      hijos: [0],
      vehiculo: [''],
      
      // Datos laborales
      direccionTrabajo: [''],
      puesto: [''],
      antiguedad: [''],
      telefonoTrabajo: [''],
      
      // Datos del préstamo
      monto: [''],
      plazo: [''],
      proposito: [''],
      descripcionIngresosExtra: [''],
      ingresosExtra: [0],
      gananciasNegocio: [0],
      gastosServiciosHogar: [0],
      gastosComidaVestido: [0],
      gastosRentaVivienda: [0],
      otrosGastosPersonales: [0],
      gastosServiciosNegocio: [0],
      gastosRentaNegocio: [0],
      inversionNegocio: [0],
      Valormercancia: [0],
      
      // Aval
      avalNombre: [''],
      avalTelefono: [''],
      avalCalle: [''],
      avalNumero: [''],
      avalColonia: [''],
      avalLocalidad: [''],
      avalCP: [''],
      avalEstado: [''],
      avalOcupacion: [''],
      avalTiempoConocido: [''],
      
      // Referencia
      referenciaNombre: [''],
      referencialTelefono: [''],
      referenciaCalle: [''],
      referenciaNumero: [''],
      referenciaColonia: [''],
      referenciaLocalidad: [''],
      referenciaCP: [''],
      referenciaEstado: [''],
      referenciaOcupacion: [''],
      referenciaTiempoConocido: [''],
    });
  }

  ngOnInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement, {
      backgroundColor: 'rgb(255, 255, 255)',
      penColor: 'rgb(0, 0, 0)'
    });
  }

  onImageUpload(event: Event, type: 'foto' | 'ubicacionCasa' | 'ubicacionTrabajo'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.imageFiles[type] = file;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === 'foto') {
          this.profileImagePreview = result;
        } else if (type === 'ubicacionCasa') {
          this.ubicacionCasaPreview = result;
        } else if (type === 'ubicacionTrabajo') {
          this.ubicacionTrabajoPreview = result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  clearSignature(): void {
    this.signaturePad.clear();
    this.signaturePreview = null;
  }

  calcularTotalIngresos(): number {
    const ingresosExtra = this.creditForm.get('ingresosExtra')?.value || 0;
    const gananciasNegocio = this.creditForm.get('gananciasNegocio')?.value || 0;
    return Number(ingresosExtra) + Number(gananciasNegocio);
  }

  calcularTotalEgresos(): number {
    const gastosServiciosHogar = this.creditForm.get('gastosServiciosHogar')?.value || 0;
    const gastosComidaVestido = this.creditForm.get('gastosComidaVestido')?.value || 0;
    const gastosRentaVivienda = this.creditForm.get('gastosRentaVivienda')?.value || 0;
    const otrosGastosPersonales = this.creditForm.get('otrosGastosPersonales')?.value || 0;
    const gastosServiciosNegocio = this.creditForm.get('gastosServiciosNegocio')?.value || 0;
    const gastosRentaNegocio = this.creditForm.get('gastosRentaNegocio')?.value || 0;
    const inversionNegocio = this.creditForm.get('inversionNegocio')?.value || 0;

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

  onSubmit(): void {
    if (this.creditForm.invalid) {
      this.creditForm.markAllAsTouched();
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    if (this.signaturePad.isEmpty()) {
      alert('Por favor proporcione su firma de autorización');
      return;
    }

    if (!this.profileImagePreview) {
      alert('Por favor suba una fotografía');
      return;
    }

    this.isLoading = true;
    
    // Preparar imágenes para enviar
    const imagenes: any[] = [];
  
  // Foto (asegurarse que tiene el prefijo data:image/)
  if (this.profileImagePreview) {
    imagenes.push({
      tipo: 'foto',
      base64: this.ensureBase64Prefix(this.profileImagePreview)
    });
  }
  
  // Firma
  const signatureData = this.signaturePad.toDataURL();
  imagenes.push({
    tipo: 'firma',
    base64: this.ensureBase64Prefix(signatureData)
  });
  
  // Ubicaciones (asegurar prefijo)
  if (this.ubicacionCasaPreview) {
    imagenes.push({
      tipo: 'ubicacion_casa',
      base64: this.ensureBase64Prefix(this.ubicacionCasaPreview)
    });
  }
  
  if (this.ubicacionTrabajoPreview) {
    imagenes.push({
      tipo: 'ubicacion_trabajo',
      base64: this.ensureBase64Prefix(this.ubicacionTrabajoPreview)
    });
  }

  // Enviar datos
  this.creditService.crearSolicitud(this.creditForm.value, imagenes)
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: (response) => this.handleSuccess(response),
      error: (error) => this.handleError(error)
    });
}
// Dentro de tu CreditApplicationComponent
private handleSuccess(response: any): void {
  console.log('Solicitud enviada con éxito', response);
  
  // Mostrar mensaje de éxito al usuario
  alert('¡Solicitud enviada correctamente! Número de folio: ' + (response.solicitud_id || ''));
  
  // Resetear formulario
  this.resetForm();
}

private handleError(error: Error): void {
  console.error('Error al enviar la solicitud:', error);
  
  // Mostrar mensaje de error adecuado al usuario
  let errorMessage = 'Error al enviar la solicitud. Por favor intente nuevamente.';
  
  if (error.message.includes('servidor')) {
    errorMessage = 'Problema con el servidor. Intente más tarde.';
  } else if (error.message.includes('conectar')) {
    errorMessage = 'No se pudo conectar al servidor. Verifique su conexión a internet.';
  }
  
  alert(errorMessage);
  
  // Reactivar el formulario para permitir reintentos
  this.isLoading = false;
}

private resetForm(): void {
  // Resetear formulario
  this.creditForm.reset();
  
  // Limpiar firma
  this.signaturePad.clear();
  this.signaturePreview = null;
  
  // Limpiar previsualizaciones de imágenes
  this.profileImagePreview = null;
  this.ubicacionCasaPreview = null;
  this.ubicacionTrabajoPreview = null;
  
  // Resetear archivos
  this.imageFiles = {};
  
  // Restablecer estado de carga
  this.isLoading = false;
}
private ensureBase64Prefix(base64Str: string): string {
  // Asegurar que la cadena base64 tenga el prefijo correcto
  if (!base64Str.startsWith('data:')) {
    return `data:image/png;base64,${base64Str}`;
  }
  return base64Str;
}




}