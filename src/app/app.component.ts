import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraTodosComponent } from './cabecera-todos/cabecera-todos.component';
import { FooterComponent } from './footer/footer.component';
 
 
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CabeceraTodosComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'landingpage';
  algo="Oportunidades y beneficios";
  algo2="";
  teamMembers = [
    {
      image: 'img/image27.png',
      altText: 'Prestamos al instante',
      title: 'Prestamos al instante',
      text: '',
    },
    {
      image: 'img/image28.png',
      altText: 'Facilidad de pago',
      title: 'Facilidad de pago',
      text: '',
    },
    {
      image: 'img/image29.png',
      altText: 'Tramite facil y rapido',
      title: 'Tramite facil y rapido',
      text: '',
    }
  ];

  // Segundo conjunto de items (ejemplo diferente)
  services = [
    {
      image: 'img/image37.png',
      altText: 'Crédito rápido',
      title: '¡Contactanos!',
      text: 'Comunícate con nosotros vía telefónica o por redes sociales.'
    },
    {
      image: 'img/image38.png',
      altText: 'Crédito empresarial',
      title: '¡Rellena el formato en linea!',
      text: 'Rellena el formato online.'
    },
    {
      image: 'img/image13.png',
      altText: 'Préstamo personal',
      title: '¡Visitanos!',
      text: 'Visitanos en las oficinas.'
    }
  ];
}
