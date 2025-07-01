import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  
import { CreditService } from '../services/credit.service';
import SignaturePad from 'signature_pad';
import { routes } from '../app.routes';
 import { Router } from '@angular/router';
@Component({
  selector: 'app-credit-application',
  imports: [CommonModule,ReactiveFormsModule],
 
  templateUrl: './credit-application.component.html',
  styleUrl: './credit-application.component.css'
})
export class CreditApplicationComponent implements AfterViewInit {
  @ViewChild('signaturePad', { static: false }) signaturePadEl!: ElementRef;
   creditForm: FormGroup;
  /*profileImage: string | ArrayBuffer | null = null;
*/
  selectedImageFile: File | null = null;
  profileImage: string | ArrayBuffer | null = null;
  signaturePad!: SignaturePad;
  isSubmitting = false;

  constructor(private fb: FormBuilder,
    private creditService: CreditService,
  private router: Router) {
    this.creditForm = this.fb.group({
      
      // Datos personales
       nombre:[''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      curp: [''],
      telefono: [''],
      email: [''],
      vivienda: [''],
      calle: [''],
      numero: [''],
      colonia:[''],
      localidad: [''],
      cp: [''],
      estado: [''],
      conyuge: [''],
      hijos: [''],
      vehiculo: [''],      
      // Datos laborales
      direccionTrabajo:[''],
      puesto:[''],
      antiguedad:[''],
      telefonoTrabajo: [''],
      // Datos del préstamo
      monto: [''],
      plazo: [''],
      montoAutorizado: [''],
      plazoAutorizado: [''],
      proposito: [''],
    
       // Ingresos
      //ingresosFijos: ['', [Validators.required, Validators.min(0)]],
      descripcionIngresosExtra: [''],
      ingresosExtra: ['', [Validators.min(0)]],
      gananciasNegocio: ['', [Validators.min(0)]],
      
      // Egresos
      gastosServiciosHogar: ['', [Validators.min(0)]],
      gastosComidaVestido: ['', [Validators.min(0)]],
      gastosRentaVivienda: ['', [Validators.min(0)]],
      otrosGastosPersonales: ['', [Validators.min(0)]],
      gastosServiciosNegocio: ['', [Validators.min(0)]],
      gastosRentaNegocio: ['', [Validators.min(0)]],
      inversionNegocio: ['', [Validators.min(0)]],
      
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
            referenciaTelefono: [''],
      referenciaCalle: [''],
      referenciaNumero: [''],
      referenciaColonia: [''],
      referenciaLocalidad: [''],
      referenciaCP: [''],
      referenciaEstado: [''],
      referenciaOcupacion: [''],
      referenciaTiempoConocido: [''],
      
      // Referencia
      // ... otros campos de referencia ...
      
      // Mapas
      mapaCasa: [''],
      mapaNegocio: [''],
      
      // Firma (podrías guardar como base64)
      firmaDigital: ['']
    });
  }

ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.signaturePadEl.nativeElement, {
      backgroundColor: 'rgb(255, 255, 255)',
      penColor: 'rgb(0, 0, 0)'
    });
    
    this.resizeSignaturePad();
    window.addEventListener('resize', this.resizeSignaturePad.bind(this));
  }

  private resizeSignaturePad() {
    const canvas = this.signaturePadEl.nativeElement;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d').scale(ratio, ratio);
    
    this.signaturePad.clear(); // Limpiar después de redimensionar
  }

  clearSignature() {
    this.signaturePad.clear();
  }
   calcularTotalIngresos(): number {
    const form = this.creditForm.value;
    return (form.ingresosExtra || 0) + 
           (form.gananciasNegocio || 0);
           //(form.ingresosFijos || 0) + 
  }

  calcularTotalEgresos(): number {
    const form = this.creditForm.value;
    return (form.gastosServiciosHogar || 0) + 
           (form.gastosComidaVestido || 0) + 
           (form.gastosRentaVivienda || 0) + 
           (form.otrosGastosPersonales || 0) + 
           (form.gastosServiciosNegocio || 0) + 
           (form.gastosRentaNegocio || 0) + 
           (form.inversionNegocio || 0);
  }

 
 
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validaciones
      if (!file.type.match('image.*')) {
        alert('Por favor, sube solo imágenes');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe exceder los 5MB');
        return;
      }
      
      this.selectedImageFile = file;
      
      // Mostrar previsualización
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.creditForm.invalid || this.isSubmitting) return;

    // Verificar si hay firma
    if (this.signaturePad.isEmpty()) {
      alert('Por favor, proporcione su firma de autorización');
      return;
    }

    this.isSubmitting = true;

    // Obtener la firma como imagen
    const signatureData = this.signaturePad.toDataURL('image/png');
    
    // Calcular totales
    const totalIngresos = this.calcularTotalIngresos();
    const totalEgresos = this.calcularTotalEgresos();

    // Preparar datos de la solicitud
    const solicitudData = {
      datosPersonales: this.getDatosPersonales(),
      datosLaborales: this.getDatosLaborales(),
      datosPrestamo: {
        ...this.creditForm.getRawValue(),
        totalIngresos,
        totalEgresos
      }
    };

    this.creditService.crearSolicitud(
      solicitudData, 
      this.selectedImageFile || undefined,
      signatureData
    ).subscribe({
      next: () => {
        alert('Solicitud enviada correctamente');
        this.router.navigate(['/confirmacion']);
      },
      error: (err) => {
        console.error('Error al enviar solicitud:', err);
        alert('Ocurrió un error al enviar la solicitud');
        this.isSubmitting = false;
      }
    });
  }










  
  private getDatosPersonales(): any {
    const form = this.creditForm.value;
    return {
      nombre: form.nombre,
      apellidoPaterno: form.apellidoPaterno,
      apellidoMaterno: form.apellidoMaterno,
      curp: form.curp,
      telefono: form.telefono,
      email: form.email,
      vivienda: form.vivienda,
      direccion: {
        calle: form.calle,
        numero: form.numero,
        colonia: form.colonia,
        localidad: form.localidad,
        cp: form.cp,
        estado: form.estado
      },
      conyuge: form.conyuge,
      hijos: form.hijos,
      vehiculo: form.vehiculo
    };
  }

  private getDatosLaborales(): any {
    const form = this.creditForm.value;
    return {
      direccionTrabajo: form.direccionTrabajo,
      puesto: form.puesto,
      antiguedad: form.antiguedad,
      telefonoTrabajo: form.telefonoTrabajo
    };
  }

  

}