import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  redesSociales = [
    { nombre: 'Facebook', icono: 'img/rs1.png', url: 'https://www.facebook.com/share/1G12QYeBJ3/' },
    { nombre: 'Instagram', icono: 'img/rs2.png', url: 'https://www.instagram.com/apoyos_financieros1?igsh=MXRyeG45cHJvaHBxNQ%3D%3D ' },
    { nombre: 'WhatsApp', icono:'img/rs3.png' , url: 'https://wa.me/5212383825275'}
  ];

  informacionContacto = [
    { texto: 'Dirección : CALLE 18 NORTE 100 PLANTA 3, COL AQUILES SERDAN. TEHUACAN PUEBLA CP 75750' },
    { texto: 'Teléfono: 238 382 5275' },
    { texto: 'Correo electrónico: estregramyj@gmail.com' },
    { texto: ' Horarios de atención: Lunes a Viernes: 9:00am - 5:30pm' }
  ];
}