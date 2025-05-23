import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-products-section',
  imports: [CommonModule,RouterModule],
  templateUrl: './products-section.component.html',
  styleUrl: './products-section.component.css'
})
export class ProductsSectionComponent {
 products = [
    {
      id: 1,
      name: 'Credito Personal',
      image: 'icon/cr1.png',
      path: '/products/3'
    },
    {
      id: 2,
      name: 'Credito de flujo',
      image: 'icon/cr2.png',
      path: '/products/3'
    },
    {
      id: 3,
      name: 'Credito al consumo',
      image: 'icon/cr3.png',
      path: '/products/3'
    },
    {
      id: 4,
      name: 'Credito comercial',
      image: 'icon/cr4.png',
      path: '/products/3'
    },
    {
      id: 5,
      name: 'Credito para incremento',
      image: 'icon/cr5.png',
      path: '/products/3'
    },
    {
      id: 6,
      name: 'Credito Grupal',
      image: 'icon/cr6.png',
      path: '/credito6'
    }
  ];
 
  // En un caso real, estos datos podrían venir de un servicio
}