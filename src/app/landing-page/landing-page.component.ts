import { Component } from '@angular/core';
import { CreditBannerComponent } from '../credit-banner/credit-banner.component';
import { ProductsSectionComponent } from '../products-section/products-section.component';
import { ImageTextTrioComponent } from '../image-text-trio/image-text-trio.component';
import { ImageCarouselComponent } from '../image-carousel/image-carousel.component';
import { SecondcreditBannerComponent } from '../secondcredit-banner/secondcredit-banner.component';
import { RecruitmentBannerComponent } from '../recruitment-banner/recruitment-banner.component';

@Component({
  selector: 'app-landing-page',
  imports: [CreditBannerComponent,ProductsSectionComponent,ImageTextTrioComponent,
    ImageCarouselComponent,SecondcreditBannerComponent,RecruitmentBannerComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  image= 'img/Pima.png';
  secondcred= 'img/image25.png';
  recrcred= 'img/Unete.png';
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