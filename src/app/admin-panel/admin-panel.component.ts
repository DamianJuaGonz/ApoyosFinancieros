import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreditService } from '../services/credit.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { RouterModule } from '@angular/router';


import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http'; // Asegúrate de importar HttpClient
import { concat } from 'rxjs';


@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
  , standalone: true
})
export class AdminPanelComponent {
  solicitudes: any[] = [];
  solicitudesAprobadas: any[] = [];

  
  isLoggedIn = false;/*
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
*/
loginForm: FormGroup;
  selectedSolicitud: any = null;
  showModal = false;


  constructor(
    private creditService: CreditService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient // Añadir HttpClient
  ) {
    // Inicialización del formulario en el constructor
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Verificar si ya está logueado
    const token = localStorage.getItem('adminToken');
    if (token) {
      this.isLoggedIn = true;
      this.cargarSolicitudes();
    }
  }

 login() {
    if (this.loginForm.valid) {
      // Uso de ! para indicar que sabemos que no son null/undefined
      const username = this.loginForm.get('username')!.value;
      const password = this.loginForm.get('password')!.value;
      
      this.creditService.login(username, password).subscribe({
        next: (admins) => {
          if (admins && admins.length > 0) {
            this.isLoggedIn = true;
            localStorage.setItem('adminToken', 'loggedIn');
            this.cargarSolicitudes();
          } else {
            alert('Credenciales incorrectas');
          }
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          alert('Error al iniciar sesión');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  cargarSolicitudes() {
    this.creditService.obtenerSolicitudes().subscribe({
      next: (solicitudes) => {
        this.solicitudes = solicitudes;
      },
      error: (err) => {
        console.error('Error al cargar solicitudes:', err);
      }
    });

    this.creditService.obtenerSolicitudesAprobadas().subscribe({
      next: (aprobadas) => {
        this.solicitudesAprobadas = aprobadas;
      },
      error: (err) => {
        console.error('Error al cargar solicitudes aprobadas:', err);
      }
    });
  }

  aprobarSolicitud(id: number) {
    this.creditService.aprobarSolicitud(id).subscribe({
      next: () => {
        alert('Solicitud aprobada');
        this.cargarSolicitudes();
      },
      error: (err) => {
        console.error('Error al aprobar solicitud:', err);
        alert('Error al aprobar solicitud');
      }
    });
  }
/*
  rechazarSolicitud(id: number) {
    this.creditService.rechazarSolicitud(id).subscribe({
      next: () => {
        alert('Solicitud rechazada');
        this.cargarSolicitudes();
      },
      error: (err) => {
        console.error('Error al rechazar solicitud:', err);
        alert('Error al rechazar solicitud');
      }
    });
  }
*/
rechazarSolicitud(solicitud: any) {

    
    if (confirm(`¿Está seguro que desea rechazar y eliminar completamente la solicitud de ${solicitud.datosPersonales.nombre}?`)) {
      this.creditService.eliminarSolicitudCompleta(solicitud).subscribe({
        next: () => {
          alert('Solicitud eliminada completamente');
          this.cargarSolicitudes();
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Error al eliminar la solicitud');
        }
      });
    }
  }
  logout() {
    localStorage.removeItem('adminToken');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  verDetalles(solicitud: any) {
    this.selectedSolicitud = solicitud;
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
  }

////////////////////////////////
  private generateHTMLForPDF(solicitud: any): string {
    return `
      <div class="pdf-container">
        <h1>Solicitud de Crédito #${solicitud.id}</h1>
        
        <div class="pdf-section">
          <h2>Datos Personales</h2>
          ${solicitud.fotoUrl ? `<img src="${solicitud.fotoUrl}" class="pdf-photo">` : ''}
          <p><strong>Nombre:</strong> ${solicitud.datosPersonales.nombre} ${solicitud.datosPersonales.apellidoPaterno} ${solicitud.datosPersonales.apellidoMaterno}</p>
          <p><strong>CURP:</strong> ${solicitud.datosPersonales.curp}</p>
          <p><strong>Teléfono:</strong> ${solicitud.datosPersonales.telefono}</p>
          <p><strong>Email:</strong> ${solicitud.datosPersonales.email}</p>
          <p><strong>Dirección:</strong> ${solicitud.datosPersonales.calle} ${solicitud.datosPersonales.numero}, ${solicitud.datosPersonales.colonia}, ${solicitud.datosPersonales.localidad}, ${solicitud.datosPersonales.estado}, C.P. ${solicitud.datosPersonales.cp}</p>
        </div>

        <div class="pdf-section">
          <h2>Datos Laborales</h2>
          <p><strong>Puesto:</strong> ${solicitud.datosLaborales.puesto}</p>
          <p><strong>Antigüedad:</strong> ${solicitud.datosLaborales.antiguedad} años</p>
          <p><strong>Dirección trabajo:</strong> ${solicitud.datosLaborales.direccionTrabajo}</p>
          <p><strong>Teléfono trabajo:</strong> ${solicitud.datosLaborales.telefonoTrabajo}</p>
        </div>

        <div class="pdf-section">
          <h2>Datos del Préstamo</h2>
          <p><strong>Monto solicitado:</strong> $${solicitud.datosPrestamo.monto}</p>
          <p><strong>Plazo solicitado:</strong> ${solicitud.datosPrestamo.plazo} meses</p>
          <p><strong>Propósito:</strong> ${solicitud.datosPrestamo.proposito}</p>
          <p><strong>Total ingresos:</strong> $${solicitud.totalIngresos}</p>
          <p><strong>Total egresos:</strong> $${solicitud.totalEgresos}</p>
        </div>

        ${solicitud.firmaUrl ? `
        <div class="pdf-section">
          <h2>Firma de Autorización</h2>
          <img src="${solicitud.firmaUrl}" class="pdf-signature">
        </div>
        ` : ''}
      </div>
    `;
  }
//////////////////////////////////7

    async exportToExcel(solicitud: any) {
    try {
       // 1. Descargar la plantilla
    const templateBuffer = await this.creditService.descargarPlantillaExcel();
    
    // 2. Cargar la plantilla
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(templateBuffer);
    
    // 3. Obtener la hoja de trabajo con verificación
    const worksheetName = 'SOLICITUD DE CREDITO'; // Nombre de tu hoja en el Excel
    const worksheet = workbook.getWorksheet(worksheetName);
    
    if (!worksheet) {
      throw new Error(`No se encontró la hoja '${worksheetName}' en la plantilla`);
    }
    
    // 4. Insertar datos en las celdas específicas
    this.fillExcelTemplate(worksheet, solicitud);
    
    // 5. Insertar imágenes (foto y firma)
    

     await this.insertImagesToExcel(workbook, worksheet, solicitud);
    
    
    
    // 6. Guardar el archivo
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `Solicitud_${solicitud.id}.xlsx`);
    
  } catch (error) {
    console.error('Error al exportar a Excel:', error);
    alert('Error al exportar a Excel: ' + (error as Error).message);
  }
  }

  private fillExcelTemplate(worksheet: ExcelJS.Worksheet, solicitud: any) {
    // Datos personales
     
    worksheet.getCell('C4').value = solicitud.datosPersonales.nombre.concat(" ", solicitud.datosPersonales.apellidoPaterno.concat(" ", solicitud.datosPersonales.apellidoMaterno));
  
    /*
    worksheet.getCell('B3').value = solicitud.datosPersonales.apellidoPaterno;
    worksheet.getCell('B4').value = solicitud.datosPersonales.apellidoMaterno;
    */
   worksheet.getCell('H4').value = solicitud.datosPersonales.curp;

     worksheet.getCell('C5').value = solicitud.datosPersonales.telefono;
     /*
       worksheet.getCell('C4').value = solicitud.datosPersonales.antiguedad;
      worksheet.getCell('C4').value = solicitud.datosPersonales.antiguedad; 
      worksheet.getCell('C4').value = solicitud.datosPersonales.calle; 
      worksheet.getCell('C4').value = solicitud.datosPersonales.numero; 
      worksheet.getCell('C4').value = solicitud.datosPersonales.colonia; 

      worksheet.getCell('C4').value = solicitud.datosPersonales.localidad; 
      worksheet.getCell('C4').value = solicitud.datosPersonales.CP; 
      worksheet.getCell('C4').value = solicitud.datosPersonales.estado; 
   */
   // ... completar con todas las celdas según tu plantilla
    
    // Datos del préstamo
 

  
  //worksheet.getCell('B7').value = solicitud.datosPersonales.email || '';
  worksheet.getCell('H5').value = solicitud.datosPersonales.vivienda;
  
  // Dirección
  worksheet.getCell('C7').value = solicitud.datosPersonales.direccion.calle;

  worksheet.getCell('F7').value = solicitud.datosPersonales.direccion.numero;
  worksheet.getCell('G7').value = solicitud.datosPersonales.direccion.colonia;
  worksheet.getCell('H7').value = solicitud.datosPersonales.direccion.localidad;
  worksheet.getCell('I7').value = solicitud.datosPersonales.direccion.cp;
  worksheet.getCell('J7').value = solicitud.datosPersonales.direccion.estado;
  
  // Situación familiar
  worksheet.getCell('E9').value = solicitud.datosPersonales.conyuge;
  worksheet.getCell('J10').value = solicitud.datosPersonales.hijos;
  worksheet.getCell('H8').value = solicitud.datosPersonales.vehiculo;

  // Datos laborales
  worksheet.getCell('B13').value = solicitud.datosLaborales.direccionTrabajo || '';
  worksheet.getCell('E13').value = solicitud.datosLaborales.puesto || '';
  worksheet.getCell('H13').value = solicitud.datosLaborales.antiguedad || '';
  worksheet.getCell('I13').value = solicitud.datosLaborales.telefonoTrabajo || '';

  // Datos del préstamo
  worksheet.getCell('B16').value = solicitud.datosPrestamo.monto;
  worksheet.getCell('D16').value = solicitud.datosPrestamo.plazo;

worksheet.getCell('H16').value = solicitud.datosPrestamo.montoAutorizado;
  worksheet.getCell('J16').value = solicitud.datosPrestamo.plazoAutorizado;

  worksheet.getCell('F27').value = solicitud.totalIngresos;
  worksheet.getCell('J27').value = solicitud.totalEgresos;
  worksheet.getCell('F16').value = solicitud.datosPrestamo.proposito;

  // Ingresos detallados
  //worksheet.getCell('H2').value = solicitud.datosPrestamo.ingresosFijos || 0;
  
  worksheet.getCell('B19').value = solicitud.datosPrestamo.descripcionIngresosExtra;


  worksheet.getCell('F24').value = solicitud.datosPrestamo.ingresosExtra;
  worksheet.getCell('F25').value = solicitud.datosPrestamo.gananciasNegocio;

  // Egresos detallados
  worksheet.getCell('J19').value = solicitud.datosPrestamo.gastosServiciosHogar;
  worksheet.getCell('J20').value = solicitud.datosPrestamo.gastosComidaVestido;
  worksheet.getCell('J21').value = solicitud.datosPrestamo.gastosRentaVivienda;
  worksheet.getCell('J22').value = solicitud.datosPrestamo.otrosGastosPersonales
  worksheet.getCell('J24').value = solicitud.datosPrestamo.gastosServiciosNegocio;
  worksheet.getCell('J25').value = solicitud.datosPrestamo.gastosRentaNegocio;
  worksheet.getCell('J26').value = solicitud.datosPrestamo.inversionNegocio;

  //fALTA VALOR ESTIMADO DE MERCANCIAS

  // Datos del aval
  
  worksheet.getCell('D31').value = solicitud.datosPrestamo.avalNombre ;
  worksheet.getCell('I31').value = solicitud.datosPrestamo.avaltelefono ;

  worksheet.getCell('C33').value = solicitud.datosPrestamo.avalCalle;
  worksheet.getCell('F33').value = solicitud.datosPrestamo.avalNumero ;
  worksheet.getCell('G33').value = solicitud.datosPrestamo.avalColonia;
  worksheet.getCell('H33').value = solicitud.datosPrestamo.avalLocalidad ;
  worksheet.getCell('I33').value = solicitud.datosPrestamo.avalCP ;
  worksheet.getCell('J33').value = solicitud.datosPrestamo.avalEstado ;
  worksheet.getCell('C34').value = solicitud.datosPrestamo.avalOcupacion ;
  worksheet.getCell('J34').value = solicitud.datosPrestamo.avalTiempoConocido ;
 
  // Referencias personales
  worksheet.getCell('D35').value = solicitud.datosPrestamo.referenciaNombre  ;
  worksheet.getCell('I35').value = solicitud.datosPrestamo.referenciaTelefono ;

  worksheet.getCell('C7').value = solicitud.datosPrestamo.referenciaCalle  ;
  worksheet.getCell('F37').value = solicitud.datosPrestamo.referenciaNumero  ;
  worksheet.getCell('G37').value = solicitud.datosPrestamo.referenciaColonia ;
  worksheet.getCell('H37').value = solicitud.datosPrestamo.referenciaLocalidad ;
  worksheet.getCell('I37').value = solicitud.datosPrestamo.referenciaCP ;
  worksheet.getCell('NJ37').value = solicitud.datosPrestamo.referencioEstado ;
  worksheet.getCell('C37').value = solicitud.datosPrestamo.referenciaOcupacion ;
  worksheet.getCell('J37').value = solicitud.datosPrestamo.referenciaTiempoConocido;

 
 
  }

private async insertImagesToExcel(workbook: ExcelJS.Workbook, worksheet: ExcelJS.Worksheet, solicitud: any) {
  try {
    // Función para agregar imagen sin problemas de tipos
    const addImageSafe = (imgId: number, tlCol: number, tlRow: number, brCol: number, brRow: number) => {
      (worksheet as any).addImage(imgId, {
        tl: { col: tlCol, row: tlRow },
        br: { col: brCol, row: brRow },
        editAs: 'oneCell'
      });
    };

    // Insertar foto
/*
    if (solicitud.fotoUrl) {
      const fotoResponse = await this.http.get(solicitud.fotoUrl, { 
        responseType: 'blob' 
      }).toPromise();
      
      if (fotoResponse) {
        const fotoBuffer = await fotoResponse.arrayBuffer();
        const extension = solicitud.fotoUrl.split('.').pop()?.toLowerCase() === 'png' ? 'png' : 'jpeg';
        
        const fotoId = workbook.addImage({
          buffer: fotoBuffer,
          extension: extension
        });
        
        addImageSafe(fotoId, 3.5, 1.2, 5.5, 3.2);
      }
    }
*/
    // Insertar firma
    if (solicitud.firmaUrl) {
      const firmaResponse = await this.http.get(solicitud.firmaUrl, { 
        responseType: 'blob' 
      }).toPromise();
      
      if (firmaResponse) {
        const firmaId = workbook.addImage({
          buffer: await firmaResponse.arrayBuffer(),
          extension: 'png'
        });
        
        addImageSafe(firmaId, 5, 54, 7, 56);
      }
    }
  } catch (error) {
    console.error('Error al insertar imágenes:', error);
    throw error;
  }
}
//////////////////////////////////////77














  async exportToPDF(solicitud: any) {
    // 1. Primero exportamos a Excel
    await this.exportToExcel(solicitud);
    
    // 2. Luego convertimos el Excel a PDF (simulado)
    alert(`Se ha generado el Excel para la solicitud ${solicitud.id}. Ahora puedes convertirlo a PDF manualmente.`);
    
    // Alternativa: generar PDF directamente (sin Excel)
     this.generatePDFDirectly(solicitud);
  }

  private async generatePDFDirectly(solicitud: any) {
    const doc = new jsPDF('p', 'mm', 'a4');
    
    // Agregar contenido al PDF
    doc.setFontSize(16);
    doc.text(`Solicitud de Crédito #${solicitud.id}`, 105, 20, { align: 'center' });
    
    // Datos personales
    doc.setFontSize(12);
    doc.text('Datos Personales:', 20, 40);
    doc.text(`Nombre: ${solicitud.datosPersonales.nombre} ${solicitud.datosPersonales.apellidoPaterno}`, 20, 50);
    // ... más datos
    
    // Agregar foto
    if (solicitud.fotoUrl) {
      const fotoResponse = await this.http.get(solicitud.fotoUrl, { responseType: 'blob' }).toPromise();
      if (fotoResponse) {
        const fotoData = await this.blobToBase64(fotoResponse);
        doc.addImage(fotoData, 'JPEG', 150, 40, 40, 40);
      }
    }
    
    // Agregar firma
    if (solicitud.firmaUrl) {
      const firmaResponse = await this.http.get(solicitud.firmaUrl, { responseType: 'blob' }).toPromise();
      if (firmaResponse) {
        const firmaData = await this.blobToBase64(firmaResponse);
        doc.addImage(firmaData, 'PNG', 20, 180, 60, 30);
      }
    }
    
    doc.save(`Solicitud_${solicitud.id}.pdf`);
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }
}


