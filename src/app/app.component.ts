import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraTodosComponent } from './cabecera-todos/cabecera-todos.component';
import { FooterComponent } from './footer/footer.component';
import { CreditBannerComponent } from './credit-banner/credit-banner.component';
import { ProductsSectionComponent } from './products-section/products-section.component';
import { ImageTextTrioComponent } from './image-text-trio/image-text-trio.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { SecondcreditBannerComponent } from './secondcredit-banner/secondcredit-banner.component';
import { RecruitmentBannerComponent } from './recruitment-banner/recruitment-banner.component';



 
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CabeceraTodosComponent,FooterComponent,CreditBannerComponent,ProductsSectionComponent,ImageTextTrioComponent,
    ImageCarouselComponent,SecondcreditBannerComponent,RecruitmentBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'landingpage';

  teamMembers = [
    {
      image: 'FoldelLandPag/image27.png',
      altText: 'Prestamos al instante',
      title: '',
      text: 'Prestamos al instante',
    },
    {
      image: 'FoldelLandPag/image28.png',
      altText: 'Facilidad de pago',
      title: '',
      text: 'Facilidad de pago',
    },
    {
      image: 'FoldelLandPag/image29.png',
      altText: 'Tramite facil y rapido',
      title: '',
      text: 'Tramite facil y rapido',
    }
  ];

  // Segundo conjunto de items (ejemplo diferente)
  services = [
    {
      image: 'https://i.ibb.co/qY1cGN8C/image-32.png',
      altText: 'Crédito rápido',
      title: 'Crédito Express',
      text: 'Aprobación en 24 horas'
    },
    {
      image: 'https://i.ibb.co/qY1cGN8C/image-32.png',
      altText: 'Crédito empresarial',
      title: 'Para tu Negocio',
      text: 'Capital de trabajo desde $50,000'
    },
    {
      image: 'https://i.ibb.co/qY1cGN8C/image-32.png',
      altText: 'Préstamo personal',
      title: 'Préstamos',
      text: 'Hasta 36 meses para pagar'
    }
  ];
}
