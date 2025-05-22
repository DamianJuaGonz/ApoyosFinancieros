import { Component } from '@angular/core';
import { GridBannerComponent } from '../grid-banner/grid-banner.component';
import { SplitContentComponent } from '../split-content/split-content.component';
import { BlueRectangleComponent } from '../blue-rectangle/blue-rectangle.component';
import { ContactBannerComponent } from '../contact-banner/contact-banner.component';

@Component({
  selector: 'app-requisitos',
  imports: [GridBannerComponent,SplitContentComponent,BlueRectangleComponent,ContactBannerComponent],
  templateUrl: './requisitos.component.html',
  styleUrl: './requisitos.component.css'
})



export class RequisitosComponent {
customContactData = {
  title: "¡CONTÁCTANOS PARA MÁS INFORMACIÓN!",
  phone: "5551234567",
  email: "contacto@empresa.com",
  address: "Av. Principal 123, Ciudad, CP 00000",
  availability: "Servicio disponible 24/7",
  socialMedia: [
    { icon: 'assets/icons/facebook-blue.png', alt: 'Facebook' },
    { icon: 'assets/icons/linkedin.png', alt: 'LinkedIn' },
    { icon: 'assets/icons/whatsapp.png', alt: 'WhatsApp' }
  ],
  bottomImage: 'assets/icons/support-icon.png'
};



  rectangleText1 = "Nota: Presentar estos documentos en fisico a las oficinas.";
  mainBanner = {
    title: 'REQUISITOS',
    description: '(Generales de solicitud de credito )',
    image: 'img/image43.png',
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

}
