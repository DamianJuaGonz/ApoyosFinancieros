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
    'assets/images/finance1.jpg',
    'assets/images/finance2.jpg'
  ]
};
}
