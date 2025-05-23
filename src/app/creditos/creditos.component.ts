import { Component, Input } from '@angular/core';
import { Creditosp1Component } from '../creditosp1/creditosp1.component';
import { Creditosp2Component } from '../creditosp2/creditosp2.component';
import { Creditosp3Component } from '../creditosp3/creditosp3.component';

@Component({
  selector: 'app-creditos',
  imports: [Creditosp1Component,Creditosp2Component,Creditosp3Component],
  templateUrl: './creditos.component.html',
  styleUrl: './creditos.component.css'
})
export class CreditosComponent {
bannerData = {
  title: "Soluciones Financieras",
  description: "Encuentra las mejores opciones crediticias para tus necesidades personales y empresariales",
  aquaBoxText: "Nuevo",
  navyBoxText: "Oferta 2023",
  whiteSectionText: "Nuestro equipo de asesores está listo para ayudarte a encontrar el producto financiero que mejor se adapte a tus necesidades. Contáctanos para una consulta gratuita y sin compromiso.",
  rightImages: [
    'img/py2.png',
    'img/py1.png'
  ]
};
sectionData = {
  title: "Nuestros Valores",
  backgroundImage: "assets/images/team-background.jpg",
  leftBox: {
    title: "Compromiso",
    items: [
      "Excelencia en servicio",
      "Soporte 24/7",
      "Soluciones personalizadas"
    ]
  },
  rightBox: {
    title: "Ventajas",
    items: [
      "Tasas competitivas",
      "Proceso rápido",
      "Asesoría especializada"
    ]
  }
};

blockData = {
  grayText: "Este es el contenido del bloque gris centrado. Puede incluir cualquier texto descriptivo.",
  blueText: "Este es el contenido del bloque azul. El color ayuda a destacar información importante.",
  spaceSize: "120px" // Tamaño personalizado para los espacios
};

}
