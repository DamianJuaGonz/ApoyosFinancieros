import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-credit-banner',
  imports: [],
  templateUrl: './credit-banner.component.html',
  styleUrl: './credit-banner.component.css'
})
export class CreditBannerComponent {
   @Input() imageUrl: string = '';
  // Puedes añadir lógica para el botón aquí
  showMoreInfo() {
    // Lógica al hacer clic en el botón
    console.log('Botón "Más información" clickeado');
    // Puedes redirigir a otra página o mostrar un modal
    
  }
}