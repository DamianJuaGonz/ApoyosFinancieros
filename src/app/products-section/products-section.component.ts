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
      name: 'Crédito Empresarial',
      image: 'assets/images/business-credit.png'
    },
    {
      name: 'Línea de Capital',
      image: 'assets/images/capital-line.png'
    },
    {
      name: 'Crédito Pyme',
      image: 'assets/images/sme-loan.png'
    },
    {
      name: 'Financiamiento',
      image: 'assets/images/financing.png'
    },
    {
      name: 'Tarjeta de Crédito',
      image: 'assets/images/credit-card.png'
    },
    {
      name: 'Leasing',
      image: 'assets/images/leasing.png'
    }
  ];

  // En un caso real, estos datos podrían venir de un servicio
}