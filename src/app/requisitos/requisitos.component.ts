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
  address: "CALLE 18 NORTE 100 PLANTA 3, COL AQUILES SERDAN. TEHUACAN PUEBLA CP 75750",
  availability: "Servicio disponible 24/7",
  socialMedia: [
    { icon: 'img/rs1.png', alt: 'Facebook', url: 'https://www.facebook.com/share/1G12QYeBJ3/'  },
    { icon: 'img/rs2.png', alt: 'LinkedIn',url: 'https://www.instagram.com/apoyos_financieros1?igsh=MXRyeG45cHJvaHBxNQ%3D%3D ' },
    { icon: 'img/rs3.png', alt: 'WhatsApp', url: 'https://wa.me/5212383825275' }
  ],
  bottomImage: 'img/image48.png'
};




}
