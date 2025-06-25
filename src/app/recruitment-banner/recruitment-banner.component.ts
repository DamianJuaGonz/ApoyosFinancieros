import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recruitment-banner',
  imports: [RouterModule],
  templateUrl: './recruitment-banner.component.html',
  styleUrl: './recruitment-banner.component.css'
})
export class RecruitmentBannerComponent {
 @Input() imageUrl: string = '';
  // Método para manejar el clic en el texto
  handleClick() {
    // Lógica para redirigir o mostrar más información
    console.log('Texto "Da click aquí" seleccionado');
    // Ejemplo: window.location.href = '/reclutamiento';
  }



  
}