import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-banner',
  imports: [CommonModule],
  templateUrl: './contact-banner.component.html',
  styleUrl: './contact-banner.component.css'
})
export class ContactBannerComponent {   
  // Datos de contacto
  @Input() backgroundImage: string = 'assets/images/contact-bg.jpg';
  
  @Input() contactData = {
    title: "¡SI TIENES DUDAS3 CONTACTANOS!3",
    phone: "2383825275",
    email: "estragramyl@gmail.com",
    address: "CALLE 18 NORTE 100 PLANTA 3, COL AQUILES SERDAN. TEHUACAN PUEBLA CP 75750",
    availability: "Estamos las 24/7 para ayudarte",
    socialMedia: [
      { icon: 'assets/icons/facebook.png', alt: 'Facebook', url: 'https://wa.me/5212383825275' },
      { icon: 'assets/icons/twitter.png', alt: 'Twitter' , url: 'https://wa.me/5212383825275' },
      { icon: 'assets/icons/instagram.png', alt: 'Instagram' , url: 'https://wa.me/5212383825275' }
    ],
    bottomImage: 'assets/icons/contact-icon.png'
  };
}
