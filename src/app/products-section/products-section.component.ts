import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products-section',
  imports: [CommonModule],
  templateUrl: './products-section.component.html',
  styleUrl: './products-section.component.css'
})
export class ProductsSectionComponent {
 products = [
    {
      name: 'Credito Personal',
      image: 'icon/cr1.png'
    },
    {
      name: 'Credito de flujo',
      image: 'icon/cr2.png'
    },
    {
      name: 'Credito al consumo',
      image: 'icon/cr3.png'
    },
    {
      name: 'Credito comercial',
      image: 'icon/cr4.png'
    },
    {
      name: 'Credito para incremento',
      image: 'icon/cr5.png'
    },
    {
      name: 'Credito Grupal',
      image: 'icon/cr6.png'
    }
  ];

  // En un caso real, estos datos podrían venir de un servicio
}