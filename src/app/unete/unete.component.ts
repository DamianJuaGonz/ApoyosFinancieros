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
  title: "Nuestros Servicios",
  topItems: [
    { image: 'icon/cr2.png', text: 'Créditos Rápidos' },
    { image: 'icon/cr2.png', text: 'Préstamos Personales' },
    { image: 'icon/cr2.png', text: 'Financiamiento Empresarial' }
  ],
  bottomItems: [
    { image: 'icon/cr2.png', text: 'Seguros incluidos' },
    { image: 'icon/cr2.png', text: 'Asesoría 24/7' }
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
    mainTitle: 'Nuestros Servicios',
    leftTitle: 'Créditos Personales',
    rightTitle: 'Créditos Empresariales',
    leftItems: [
      'Aprobación en 24 horas',
      'Hasta 36 meses para pagar',
      'Sin aval para montos menores',
      'Tasas preferenciales'
    ],
    rightItems: [
      'Capital de trabajo',
      'Líneas de crédito renovables',
      'Financiamiento a largo plazo',
      'Soluciones a medida'
    ],
    footerText: 'Todos nuestros productos cuentan con seguro de protección de pagos incluido'
  };
  // Datos para el banner secundario

}
