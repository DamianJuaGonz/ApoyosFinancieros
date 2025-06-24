import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-credit-banner',
  imports: [CommonModule],
  standalone: true, // <-- Añade esto si es standalone
  templateUrl: './credit-banner.component.html',
  styleUrl: './credit-banner.component.css'
})
export class CreditBannerComponent    {
  images = [
    'img/Pima.png',
    'img/Pima2.png',
    'img/Pima3.png',
    'img/Pima4.jpeg'
  ];
  currentImageIndex = 0;
  imageUrl = this.images[0]; // Muestra la primera imagen por defecto

  // Cambia la imagen al hacer clic en los indicadores
  changeImage(index: number) {
    this.currentImageIndex = index;
    this.imageUrl = this.images[index];
  }
}