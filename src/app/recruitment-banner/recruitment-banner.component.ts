import { Component } from '@angular/core';

@Component({
  selector: 'app-recruitment-banner',
  imports: [],
  templateUrl: './recruitment-banner.component.html',
  styleUrl: './recruitment-banner.component.css'
})
export class RecruitmentBannerComponent {
 
  // Método para manejar el clic en el texto
  handleClick() {
    // Lógica para redirigir o mostrar más información
    console.log('Texto "Da click aquí" seleccionado');
    // Ejemplo: window.location.href = '/reclutamiento';
  }
}