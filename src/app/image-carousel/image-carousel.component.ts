import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  imports: [CommonModule],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.css'
})
export class ImageCarouselComponent {
 
  currentIndex = 0;
  currentPosition = 0;

    currentRealIndex = 0;
 

  isTransitioning = false;
 

  slides = [
    {
      image: 'FoldelLandPag/image31.png',
      alt: 'Imagen 1',
      text: 'Haz crecer tu negocio',
      description: ''
    },
    {
      image: 'FoldelLandPag/image32.png',
      alt: 'Imagen 2',
      text: 'Oportunidades de crecimiento',
      description: ''
    },
    {
      image: 'FoldelLandPag/image33.png',
      alt: 'Imagen 3',
      text: 'Edúcate financieramente',
      description: ''
    },

  ];

  // Duplicamos los slides para el efecto infinito
  displaySlides = [...this.slides, ...this.slides, ...this.slides];

  nextSlide() {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.currentRealIndex = (this.currentRealIndex + 1) % this.slides.length;
    
    // Calculamos la nueva posición
    const newPosition = this.currentPosition - (100 / 3);
    
    // Si estamos en la última copia de slides, saltamos sin animación
    if (newPosition <= -((this.slides.length * 2) * (100 / 3))) {
      this.currentPosition = -((this.slides.length) * (100 / 3));
      setTimeout(() => {
        this.currentPosition = -((this.slides.length + 1) * (100 / 3));
        this.isTransitioning = false;
      }, 50);
    } else {
      this.currentPosition = newPosition;
      this.isTransitioning = false;
    }
  }

  prevSlide() {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.currentRealIndex = (this.currentRealIndex - 1 + this.slides.length) % this.slides.length;
    
    // Calculamos la nueva posición
    const newPosition = this.currentPosition + (100 / 3);
    
    // Si estamos en la primera copia de slides, saltamos sin animación
    if (newPosition >= 0) {
      this.currentPosition = -((this.slides.length * 2 - 1) * (100 / 3));
      setTimeout(() => {
        this.currentPosition = -((this.slides.length * 2 - 2) * (100 / 3));
        this.isTransitioning = false;
      }, 50);
    } else {
      this.currentPosition = newPosition;
      this.isTransitioning = false;
    }
  }

  goToSlide(index: number) {
    this.currentRealIndex = index;
    this.currentPosition = -((this.slides.length + index) * (100 / 3));
  }
}