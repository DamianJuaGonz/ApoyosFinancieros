import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  redesSociales = [
    { nombre: 'Facebook', icono: 'img/rs1.png' },
    { nombre: 'Instagram', icono: 'img/rs2.png' },
    { nombre: 'WhatsApp', icono:'img/rs3.png' }
  ];

  informacionContacto = [
    { texto: 'Av. Principal #123, Col. Centro, Ciudad' },
    { texto: 'Teléfono: 55 1234 5678' },
    { texto: 'correo@myjasesores.com' },
    { texto: 'Lunes a Viernes: 9:00 - 18:00 hrs' }
  ];
}