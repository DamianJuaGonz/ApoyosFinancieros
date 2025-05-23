import { Component } from '@angular/core';
import { GridBannerComponent } from '../grid-banner/grid-banner.component';
import { SplitContentComponent } from '../split-content/split-content.component';
import { BlueRectangleComponent } from '../blue-rectangle/blue-rectangle.component';
import { ImageBoxSectionComponent } from '../image-box-section/image-box-section.component';
 
@Component({
  
  selector: 'app-unete',
  imports: [GridBannerComponent,SplitContentComponent,BlueRectangleComponent,ImageBoxSectionComponent],
    // En tu componente padre

  templateUrl: './unete.component.html',
  styleUrl: './unete.component.css',
    /*template: `
    <div class="unete-contenido">
      <!-- Tu contenido específico para Únete aquí -->
      <h1>Formulario para unirse</h1>
      <p>Contenido del componente...</p>
    </div>
  `,
  styles: [`
    .unete-contenido {
      padding: 2rem;
      min-height: calc(100vh - 120px); /* Ajusta según altura cabecera+footer 
    }
  `]*/
})
export class UneteComponent {
// En tu componente padre
sectionData = {
  title: "Únete a nosotros y accede a múltiples beneficios que impulsarán tu desarrollo profesional:",
  topItems: [
    { image: 'icon/ns1.png', text: 'Capacitación constante' },
    { image: 'icon/ns2.png', text: 'Bonos de productividad' },
    { image: 'icon/ns3.png', text: 'Comisiones' }
  ],
  bottomItems: [
    { image: 'icon/ns4.png', text: 'Excelente ambiente laboral' },
    { image: 'icon/ns5.png', text: 'Buen Horario' }
  ]
};


  rectangleText1 = "Nota: Presentar estos documentos en fisico a las oficinas.";
  rectangleText2 = "Si estás interesado, te invitamos a comunicarte a través de los medios de contacto disponibles en nuestra página web o visitarnos directamente en nuestras oficinas.";
  // Datos para el banner principal
  mainBanner = {
    title: 'UNETE A NOSOTROS',
    description: '(Requisitos de empelo )',
    image: 'img/image46.png',
    gridColor: '#8DBBD6'
  };


  
contentData = {
    mainTitle: '¿Cuáles son los requisitos?',
    leftTitle: 'REQUISITOS',
    rightTitle: 'DOCUMENTOS',
    leftItems: [
      'Edad de 18 a 50 años.',
      'Estudio minimo preparatoria.',
      'Gusto por la ventas.',
      'Actividad en campo.'
    ],
    rightItems: [
      'INE vigente.',
      'Comprobante de domicilio actualizado.',
      'Referencia personal y familiar.',
      'Carta de recomendacion'
    ],
    footerText: ''
  };
  // Datos para el banner secundario

}
