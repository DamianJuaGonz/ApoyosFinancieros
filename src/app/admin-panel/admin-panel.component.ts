import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreditService } from '../services/credit.service';
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';
import { adminpanelservice } from '../services/admin-panel.service';
import { CommonModule } from '@angular/common';
 

@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',

   
})
export class AdminPanelComponent implements OnInit { 
  // Estados del componente
  isLoggedIn = false;
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  
  // Formularios
  loginForm: FormGroup;
  
  // Datos
  solicitudes: any[] = [];
  solicitudesAprobadas: any[] = [];
  solicitudesRechazadas: any[] = [];
  
  // Modal
  showModal = false;
  selectedSolicitud: any = null;
  selectedImageType: 'foto' | 'firma' | 'ubicacion_casa' | 'ubicacion_trabajo' = 'foto';

  constructor(
    private fb: FormBuilder,
    private adminService: adminpanelservice,
    private creditService: CreditService // Inyectar el servicio
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.adminService.isAuthenticated();
    if (this.isLoggedIn) {
      this.cargarSolicitudes();
    }
  }

  // ==================== MÉTODOS DE AUTENTICACIÓN ====================
  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const { username, password } = this.loginForm.value;

    this.adminService.login(username, password).subscribe({
      next: () => {
        this.isLoggedIn = true;
        this.isLoading = false;
        this.cargarSolicitudes();
        this.showSuccess('Sesión iniciada correctamente');
      },
      error: (error) => {
        this.errorMessage = 'Credenciales incorrectas' ;
        this.isLoading = false;
      }
    });
  }

  logout(): void {
    this.adminService.logout();
    this.isLoggedIn = false;
    this.solicitudes = [];
    this.solicitudesAprobadas = [];
    this.solicitudesRechazadas = [];
    this.loginForm.reset();
    this.showSuccess('Sesión cerrada correctamente');
  }

  // ==================== MÉTODOS DE SOLICITUDES ====================
  cargarSolicitudes(): void {
    this.isLoading = true;
    
    this.adminService.getSolicitudes().subscribe({
      next: (solicitudes) => {
        this.solicitudes = solicitudes.filter((s: any) => s.estado === 'pendiente');
        this.solicitudesAprobadas = solicitudes.filter((s: any) => s.estado === 'aprobada');
        this.solicitudesRechazadas = solicitudes.filter((s: any) => s.estado === 'rechazada');
        this.isLoading = false;
      },
      error: (error) => {
        this.showError('Error al cargar solicitudes');
        this.isLoading = false;
      }
    });
  }

  changeRequestStatus(id: number, estado: string): void {
    this.isLoading = true;
    
    this.adminService.cambiarEstadoSolicitud(id, estado).subscribe({
      next: () => {
        this.cargarSolicitudes();
        this.showModal = false;
        this.showSuccess(`Solicitud ${estado === 'aprobada' ? 'aprobada' : 'rechazada'} correctamente`);
        this.isLoading = false;
      },
      error: (error) => {
        this.showError('Error al cambiar estado de la solicitud');
        this.isLoading = false;
      }
    });
  }

  deleteRequest(id: number): void {
    if (!confirm('¿Estás seguro de eliminar esta solicitud?')) {
      return;
    }

    this.isLoading = true;
    // Aquí deberías implementar el método delete en tu servicio si lo necesitas
    // this.adminService.deleteSolicitud(id).subscribe(...)
    this.showError('Función de eliminación no implementada aún');
    this.isLoading = false;
  }

  // ==================== MÉTODOS DEL MODAL ====================
  showDetails(solicitud: any): void {
    this.isLoading = true;
    
    this.adminService.getSolicitudById(solicitud.id).subscribe({
      next: (solicitudCompleta) => {
        this.selectedSolicitud = solicitudCompleta;
        this.selectedImageType = 'foto';
        this.showModal = true;
        this.isLoading = false;
      },
      error: (error) => {
        this.showError('Error al cargar detalles de la solicitud');
        this.isLoading = false;
      }
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedSolicitud = null;
  }

  selectImage(type: 'foto' | 'firma' | 'ubicacion_casa' | 'ubicacion_trabajo'): void {
    this.selectedImageType = type;
  }




















  async exportToExcel(solicitud: any): Promise<void> {
    try {
      const templateBuffer = await this.creditService.descargarPlantillaExcel();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(templateBuffer);
      
      const worksheetName = 'SOLICITUD DE CREDITO';
      const worksheet = workbook.getWorksheet(worksheetName);
      
      if (!worksheet) {
        throw new Error(`No se encontró la hoja '${worksheetName}' en la plantilla`);
      }
      
      this.fillExcelTemplate(worksheet, solicitud);
      await this.insertImagesToExcel(workbook, worksheet, solicitud);
      
      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), `Solicitud_${solicitud.id}.xlsx`);
    } catch (error) {
      console.error('Error al exportar a Excel:', error);
      alert('Error al exportar a Excel: ' + (error as Error).message);
    }
  }

  private fillExcelTemplate(worksheet: ExcelJS.Worksheet, solicitud: any): void {
    // Datos personales
    const datosPersonales = typeof solicitud.datos_personales === 'string' ? 
      JSON.parse(solicitud.datos_personales) : solicitud.datos_personales;
    
    const datosLaborales = typeof solicitud.datos_laborales === 'string' ? 
      JSON.parse(solicitud.datos_laborales) : solicitud.datos_laborales;
    
    const datosPrestamo = typeof solicitud.datos_prestamo === 'string' ? 
      JSON.parse(solicitud.datos_prestamo) : solicitud.datos_prestamo;

    worksheet.getCell('C4').value = `${datosPersonales.nombre} ${datosPersonales.apellidoPaterno} ${datosPersonales.apellidoMaterno || ''}`;
    worksheet.getCell('H4').value = datosPersonales.curp || '';
    worksheet.getCell('C5').value = datosPersonales.telefono || '';
    worksheet.getCell('H5').value = datosPersonales.vivienda || '';
    
    // Dirección
    worksheet.getCell('C7').value = datosPersonales.direccion?.calle || '';
    worksheet.getCell('F7').value = datosPersonales.direccion?.numero || '';
    worksheet.getCell('G7').value = datosPersonales.direccion?.colonia || '';
    worksheet.getCell('H7').value = datosPersonales.direccion?.localidad || '';
    worksheet.getCell('I7').value = datosPersonales.direccion?.cp || '';
    worksheet.getCell('J7').value = datosPersonales.direccion?.estado || '';
    
    // Situación familiar
    worksheet.getCell('E9').value = datosPersonales.conyuge?.nombre || '';
    worksheet.getCell('J10').value = datosPersonales.hijos || 0;
    worksheet.getCell('H8').value = datosPersonales.vehiculo || '';

    // Datos laborales
    worksheet.getCell('B13').value = datosLaborales.direccionTrabajo || '';
    worksheet.getCell('E13').value = datosLaborales.puesto || '';
    worksheet.getCell('H13').value = datosLaborales.antiguedad || '';
    worksheet.getCell('I13').value = datosLaborales.telefonoTrabajo || '';

    // Datos del préstamo
    worksheet.getCell('B16').value = datosPrestamo.monto || 0;
    worksheet.getCell('D16').value = datosPrestamo.plazo || 0;
    worksheet.getCell('F16').value = datosPrestamo.proposito || '';
    worksheet.getCell('B19').value = datosPrestamo.descripcionIngresosExtra || '';
    worksheet.getCell('F24').value = datosPrestamo.ingresosExtra || 0;
    worksheet.getCell('F25').value = datosPrestamo.gananciasNegocio || 0;
    worksheet.getCell('F27').value = solicitud.total_ingresos || 0;
    worksheet.getCell('J27').value = solicitud.total_egresos || 0;

    // Egresos detallados
    worksheet.getCell('J19').value = datosPrestamo.gastosServiciosHogar || 0;
    worksheet.getCell('J20').value = datosPrestamo.gastosComidaVestido || 0;
    worksheet.getCell('J21').value = datosPrestamo.gastosRentaVivienda || 0;
    worksheet.getCell('J22').value = datosPrestamo.otrosGastosPersonales || 0;
    worksheet.getCell('J24').value = datosPrestamo.gastosServiciosNegocio || 0;
    worksheet.getCell('J25').value = datosPrestamo.gastosRentaNegocio || 0;
    worksheet.getCell('J26').value = datosPrestamo.inversionNegocio || 0;

    // Datos del aval
    worksheet.getCell('D31').value = datosPrestamo.avalNombre || '';
    worksheet.getCell('I31').value = datosPrestamo.avalTelefono || '';
    worksheet.getCell('C33').value = datosPrestamo.avalCalle || '';
    worksheet.getCell('F33').value = datosPrestamo.avalNumero || '';
    worksheet.getCell('G33').value = datosPrestamo.avalColonia || '';
    worksheet.getCell('H33').value = datosPrestamo.avalLocalidad || '';
    worksheet.getCell('I33').value = datosPrestamo.avalCP || '';
    worksheet.getCell('J33').value = datosPrestamo.avalEstado || '';
    worksheet.getCell('C34').value = datosPrestamo.avalOcupacion || '';
    worksheet.getCell('J34').value = datosPrestamo.avalTiempoConocido || '';
 
    // Referencias personales
    worksheet.getCell('D35').value = datosPrestamo.referenciaNombre || '';
    worksheet.getCell('I35').value = datosPrestamo.referencialTelefono || '';
    worksheet.getCell('C37').value = datosPrestamo.referenciaCalle || '';
    worksheet.getCell('F37').value = datosPrestamo.referenciaNumero || '';
    worksheet.getCell('G37').value = datosPrestamo.referenciaColonia || '';
    worksheet.getCell('H37').value = datosPrestamo.referenciaLocalidad || '';
    worksheet.getCell('I37').value = datosPrestamo.referenciaCP || '';
    worksheet.getCell('J37').value = datosPrestamo.referenciaEstado || '';
    worksheet.getCell('C38').value = datosPrestamo.referenciaOcupacion || '';
    worksheet.getCell('J38').value = datosPrestamo.referenciaTiempoConocido || '';
  }

  private async insertImagesToExcel(workbook: ExcelJS.Workbook, worksheet: ExcelJS.Worksheet, solicitud: any): Promise<void> {
    try {
      const addImageSafe = (imgId: number, tlCol: number, tlRow: number, brCol: number, brRow: number) => {
        (worksheet as any).addImage(imgId, {
          tl: { col: tlCol, row: tlRow },
          br: { col: brCol, row: brRow },
          editAs: 'oneCell'
        });
      };

      // Insertar foto si existe
      if (solicitud.imagenes?.foto) {
        const fotoId = workbook.addImage({
          base64: solicitud.imagenes.foto.split(',')[1],
          extension: 'jpeg'
        });
        addImageSafe(fotoId, 1, 1, 3, 3);
      }

      // Insertar firma si existe
      if (solicitud.imagenes?.firma) {
        const firmaId = workbook.addImage({
          base64: solicitud.imagenes.firma.split(',')[1],
          extension: 'png'
        });
        addImageSafe(firmaId, 5, 54, 7, 56);
      }

    } catch (error) {
      console.error('Error al insertar imágenes:', error);
      throw error;
    }
  }















 parseJsonField(field: any): any {
    if (typeof field === 'string') {
      try {
        return JSON.parse(field);
      } catch (e) {
        return {};
      }
    }
    return field || {};
  }

  getFullName(solicitud: any): string {
    const datos = this.parseJsonField(solicitud.datos_personales);
    return `${datos.nombre} ${datos.apellidoPaterno} ${datos.apellidoMaterno || ''}`.trim();
  }

  getImageUrl(solicitud: any, type: string): string | null {
    if (!solicitud.imagenes) return null;
    
    // Buscar la imagen por tipo
    const imagen = solicitud.imagenes[type] || solicitud.imagenes.find((img: any) => img.tipo === type);
    if (!imagen) return null;
    
    // Si ya tiene el prefijo data:image, devolverlo directamente
    if (imagen.base64?.startsWith('data:') || imagen.imagen_base64?.startsWith('data:')) {
      return imagen.base64 || imagen.imagen_base64;
    }
    
    // Si no, construir la URL data
    return `data:${imagen.mime_type || 'image/png'};base64,${imagen.base64 || imagen.imagen_base64}`;
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = null, 5000);
  }

  showSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => this.successMessage = null, 5000);
  }



 
}