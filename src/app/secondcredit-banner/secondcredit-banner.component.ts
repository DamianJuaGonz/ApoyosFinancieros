import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-secondcredit-banner',
  imports: [],
  templateUrl: './secondcredit-banner.component.html',
  styleUrl: './secondcredit-banner.component.css'
})
export class SecondcreditBannerComponent {
 @Input() imageUrl: string = '';
  // Puedes añadir lógica para el botón aquí
  showInterest() {
    // Lógica al hacer clic en el botón
    console.log('Botón "Me interesa" clickeado');
    // Puedes redirigir a la solicitud de crédito
  }
}
