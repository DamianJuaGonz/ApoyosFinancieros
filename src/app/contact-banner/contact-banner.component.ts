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
    title: "¡SI TIENES DUDAS CONTACTANOS!",
    phone: "2383825275",
    email: "estragramyl@gmail.com",
    address: "Independencia Ote. 735 Interior 2 Tehuacán, Pue. CP 75700",
    availability: "Estamos las 24/7 para ayudarte",
    socialMedia: [
      { icon: 'assets/icons/facebook.png', alt: 'Facebook' },
      { icon: 'assets/icons/twitter.png', alt: 'Twitter' },
      { icon: 'assets/icons/instagram.png', alt: 'Instagram' }
    ],
    bottomImage: 'assets/icons/contact-icon.png'
  };
}
