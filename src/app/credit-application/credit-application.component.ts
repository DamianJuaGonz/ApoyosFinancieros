import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import SignaturePad from 'signature_pad';
import { CreditService } from '../services/credit.service';
import { finalize } from 'rxjs';

export interface ImagenSolicitud {
  tipo: 'foto' | 'firma' | 'ubicacion_casa' | 'ubicacion_trabajo' | 'url_ubicacion_casa' | 'url_ubicacion_trabajo';
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
  showImageError = false;
  showSignatureError = false;

  private readonly MAX_IMAGE_SIZE_MB = 2; // 2MB máximo por imagen
  
  // Propiedades para previsualización
  profileImagePreview: string | null = null;
  ubicacionCasaPreview: string | null = null;
  ubicacionTrabajoPreview: string | null = null;

  // Archivos de imagen para enviar al servidor
  private imageFiles: {
    foto?: File;
    ubicacionCasa?: File;
    ubicacionTrabajo?: File;
  } = {};

   constructor(
    private fb: FormBuilder,
    private creditService: CreditService
  ) {
    this.creditForm = this.fb.group({
      // Datos personales
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apellidoPaterno: ['', [Validators.required, Validators.maxLength(50)]],
      apellidoMaterno: ['', [Validators.maxLength(50)]],
      curp: ['', [
        Validators.required, 
        Validators.pattern(/^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z]{2}$/)
      ]],
      telefono: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      email: ['', [Validators.required, Validators.email]],
      vivienda: ['', Validators.required],
      antiguedadVivienda: ['', [Validators.required, Validators.min(0)]],
      calle: ['', [Validators.required, Validators.maxLength(100)]],
      numero: ['', [Validators.required, Validators.maxLength(10)]],
      colonia: ['', [Validators.required, Validators.maxLength(50)]],
      localidad: ['', [Validators.required, Validators.maxLength(50)]],
      cp: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{5}$/)
      ]],
      estado: ['', Validators.required],
      EstadoCivil: ['', Validators.required],
      conyuge: [''],
      TelefonoCON: ['', Validators.pattern(/^[0-9]{10}$/)],
      OcupacionC: [''],
      hijos: [0, [Validators.min(0), Validators.max(20)]],
      vehiculo: ['', Validators.required],
      
      // Datos laborales
      direccionTrabajo: ['', [Validators.required, Validators.maxLength(150)]],
      puesto: ['', [Validators.required, Validators.maxLength(50)]],
      antiguedad: ['', [Validators.required, Validators.min(0)]],
      telefonoTrabajo: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      
      // Datos del préstamo
      monto: ['', [
        Validators.required,
        Validators.min(1000),
        Validators.max(1000000)
      ]],
      plazo: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(120)
      ]],
      proposito: ['', [Validators.required, Validators.maxLength(200)]],
      descripcionIngresosExtra: ['', Validators.maxLength(200)],
      ingresosExtra: [0, [Validators.min(0), Validators.max(1000000)]],
      gananciasNegocio: [0, [Validators.min(0), Validators.max(1000000)]],
      gastosServiciosHogar: [0, [Validators.min(0), Validators.max(1000000)]],
      gastosComidaVestido: [0, [Validators.min(0), Validators.max(1000000)]],
      gastosRentaVivienda: [0, [Validators.min(0), Validators.max(1000000)]],
      otrosGastosPersonales: [0, [Validators.min(0), Validators.max(1000000)]],
      gastosServiciosNegocio: [0, [Validators.min(0), Validators.max(1000000)]],
      gastosRentaNegocio: [0, [Validators.min(0), Validators.max(1000000)]],
      inversionNegocio: [0, [Validators.min(0), Validators.max(1000000)]],
      Valormercancia: [0, [Validators.min(0), Validators.max(1000000)]],
      
      // Aval
      avalNombre: [''],
      avalTelefono: ['', Validators.pattern(/^[0-9]{10}$/)],
      avalCalle: [''],
      avalNumero: [''],
      avalColonia: [''],
      avalLocalidad: [''],
      avalCP: ['', Validators.pattern(/^[0-9]{5}$/)],
      avalEstado: [''],
      avalOcupacion: [''],
      avalTiempoConocido: [''],
      
      // Referencia
      referenciaNombre: [''],
      referencialTelefono: ['', Validators.pattern(/^[0-9]{10}$/)],
      referenciaCalle: [''],
      referenciaNumero: [''],
      referenciaColonia: [''],
      referenciaLocalidad: [''],
      referenciaCP: ['', Validators.pattern(/^[0-9]{5}$/)],
      referenciaEstado: [''],
      referenciaOcupacion: [''],
      referenciaTiempoConocido: [''],
          urlUbicacionCasa: [''],
  urlUbicacionTrabajo: [''],
    });
  }

  ngOnInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement, {
      backgroundColor: 'rgb(255, 255, 255)',
      penColor: 'rgb(0, 0, 0)'
    });
  }

  showError(controlName: string): boolean {
    const control = this.creditForm.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.creditForm.get(controlName);
    if (!control || !control.errors) return '';
    
    if (control.errors['required']) {
      return 'Este campo es requerido';
    }
    
    if (control.errors['pattern']) {
      switch(controlName) {
        case 'curp':
          return 'Formato de CURP inválido';
        case 'telefono':
        case 'telefonoTrabajo':
        case 'TelefonoCON':
        case 'avalTelefono':
        case 'referencialTelefono':
          return 'Teléfono debe tener 10 dígitos';
        case 'cp':
        case 'avalCP':
        case 'referenciaCP':
          return 'Código Postal debe tener 5 dígitos';
        default:
          return 'Formato inválido';
      }
    }
    
    if (control.errors['email']) {
      return 'Ingrese un correo electrónico válido';
    }
    
    if (control.errors['minlength'] || control.errors['maxlength']) {
      return `Debe tener entre ${control.errors['minlength']?.requiredLength || 0} y ${control.errors['maxlength']?.requiredLength || 0} caracteres`;
    }
    
    if (control.errors['min']) {
      return `El valor mínimo permitido es ${control.errors['min'].min}`;
    }
    
    if (control.errors['max']) {
      return `El valor máximo permitido es ${control.errors['max'].max}`;
    }
    
    return 'Valor inválido';
  }







onImageUpload(event: Event, type: 'foto' | 'ubicacionCasa' | 'ubicacionTrabajo'): void {
  const input = event.target as HTMLInputElement;
  
  if (!input.files || input.files.length === 0) {
    return;
  }

  const file = input.files[0];
  
  // Validar tamaño de la imagen
  if (file.size > this.MAX_IMAGE_SIZE_MB * 1024 * 1024) {
    alert(`La imagen es demasiado grande. Tamaño máximo permitido: ${this.MAX_IMAGE_SIZE_MB}MB`);
    input.value = ''; // Limpiar el input file
    return;
  }

  // Validar tipo de imagen (opcional)
  if (!file.type.match(/image\/(jpeg|png|jpg)/)) {
    alert('Solo se permiten imágenes en formato JPEG o PNG');
    input.value = '';
    return;
  }

  this.imageFiles[type] = file;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    const result = e.target?.result as string;
    if (type === 'foto') {
      this.profileImagePreview = result;
      this.showImageError = false;
    } else if (type === 'ubicacionCasa') {
      this.ubicacionCasaPreview = result;
    } else if (type === 'ubicacionTrabajo') {
      this.ubicacionTrabajoPreview = result;
    }
  };
  reader.onerror = () => {
    alert('Error al leer la imagen');
    input.value = '';
  };
  reader.readAsDataURL(file);
}

















  clearSignature(): void {
    this.signaturePad.clear();
    this.showSignatureError = false;
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
  isSignatureEmpty(): boolean {
  return this.signaturePad ? this.signaturePad.isEmpty() : true;
}


  onSubmit(): void {

    // Marcar todos los campos como tocados para mostrar errores
    this.creditForm.markAllAsTouched();
    // Validar firma
    if (this.isSignatureEmpty()) {
    this.showSignatureError = true;
    this.scrollToError();
    return;
  }
    


    
    // Validar foto
    if (!this.profileImagePreview) {
      this.showImageError = true;
      this.scrollToError();
      return;
    }
    
    // Validar formulario
    if (this.creditForm.invalid) {
      this.scrollToError();
      return;
    }

    this.isLoading = true;
    
    // Preparar imágenes para enviar
    const imagenes: ImagenSolicitud[] = [];
  
    // Foto
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
  
    // Ubicaciones
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
    if (this.creditForm.get('urlUbicacionCasa')?.value) {
  imagenes.push({
    tipo: 'url_ubicacion_casa',
    base64: this.creditForm.get('urlUbicacionCasa')?.value,
    mime_type: 'text/url'
  });
}

if (this.creditForm.get('urlUbicacionTrabajo')?.value) {
  imagenes.push({
    tipo: 'url_ubicacion_trabajo',
    base64: this.creditForm.get('urlUbicacionTrabajo')?.value,
    mime_type: 'text/url'
  });
}

    // Preparar datos del formulario
    const formData = {
      ...this.creditForm.value,
      // Asegurar que todos los campos numéricos tengan valor
      hijos: this.creditForm.get('hijos')?.value || 0,
      ingresosExtra: this.creditForm.get('ingresosExtra')?.value || 0,
      gananciasNegocio: this.creditForm.get('gananciasNegocio')?.value || 0,
      gastosServiciosHogar: this.creditForm.get('gastosServiciosHogar')?.value || 0,
      gastosComidaVestido: this.creditForm.get('gastosComidaVestido')?.value || 0,
      gastosRentaVivienda: this.creditForm.get('gastosRentaVivienda')?.value || 0,
      otrosGastosPersonales: this.creditForm.get('otrosGastosPersonales')?.value || 0,
      gastosServiciosNegocio: this.creditForm.get('gastosServiciosNegocio')?.value || 0,
      gastosRentaNegocio: this.creditForm.get('gastosRentaNegocio')?.value || 0,
      inversionNegocio: this.creditForm.get('inversionNegocio')?.value || 0,
      Valormercancia: this.creditForm.get('Valormercancia')?.value || 0
    };

    // Enviar datos
    this.creditService.crearSolicitud(formData, imagenes)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response) => this.handleSuccess(response),
        error: (error) => this.handleError(error)
      });
  }

  private scrollToError(): void {
    const firstErrorElement = document.querySelector('.ng-invalid');
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

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
  }

  private resetForm(): void {
    // Resetear formulario
    this.creditForm.reset();
    
    // Limpiar firma
    this.signaturePad.clear();
    
    // Limpiar previsualizaciones de imágenes
    this.profileImagePreview = null;
    this.ubicacionCasaPreview = null;
    this.ubicacionTrabajoPreview = null;
    
    // Resetear archivos
    this.imageFiles = {};
    
    // Restablecer estado de carga
    this.isLoading = false;
    this.showImageError = false;
    this.showSignatureError = false;
  }

  private ensureBase64Prefix(base64Str: string): string {
    // Asegurar que la cadena base64 tenga el prefijo correcto
    if (!base64Str.startsWith('data:')) {
      return `data:image/png;base64,${base64Str}`;
    }
    return base64Str;
  }
}