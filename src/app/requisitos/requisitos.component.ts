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




  contentData = {
    mainTitle: '¿Cuáles son los requisitos?',
    leftTitle: 'REQUISITOS',
    rightTitle: 'DOCUMENTOS',
    leftItems: [
      'Ser mayor de 18 años.', 
      'Tener actividad laboral vigente y comprobable con un minimo de un años de atiguedad.' 
      ,'Numeros telefonicos (solicitante,aval y referencia).'
    ],
    rightItems: [
      'INE vigente(solicitante y aval).', 
      'Comprobante de domicilio actualizado (solicitante y aval).',
      'Referencia personal.'
    ],
    footerText: 'Todo debera ser en copias cotejado con el original'
  };

    rectangleText1 = "Nota: En caso de ser fotos, que sean legibles y que el agulo o documento este derecho.";
  mainBanner = {
    title: 'REQUISITOS',
    description: '(Generales de solicitud de credito )',
    image: 'img/image43.png',
    gridColor: '#8DBBD6'
  };

  customContactData = {
  title: "¡SI TIENES DUDAS CONTACTANOS!",
  phone: "2383825275",
  email: "estregramyj@gmail.com",
  address: "Independecia Ote. 735 Interior 2 Tehuacán ; Pue. CP 75700",
  availability: "Servicio disponible 24/7",
  socialMedia: [
    { icon: 'img/rs1.png', alt: 'Facebook' },
    { icon: 'img/rs2.png', alt: 'LinkedIn' },
    { icon: 'img/rs3.png', alt: 'WhatsApp' }
  ],
  bottomImage: 'img/image48.png'
};




}
