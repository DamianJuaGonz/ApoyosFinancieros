import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-values-carousel',
  imports: [CommonModule],
  templateUrl: './values-carousel.component.html',
  styleUrl: './values-carousel.component.css'
})
export class ValuesCarouselComponent {
  @Input() title: string = "Valores";
  
  @Input() values = [
    {
      title: "Innovación",
      image: "assets/images/innovation.png",
      description: "Buscamos constantemente nuevas formas de servir mejor a nuestros clientes."
    },
    {
      title: "Integridad",
      image: "assets/images/integrity.png",
      description: "Actuamos con honestidad y transparencia en todas nuestras operaciones."
    },
    {
      title: "Excelencia",
      image: "assets/images/excellence.png",
      description: "Nos esforzamos por ofrecer la más alta calidad en todos nuestros servicios."
    }
  ];

  currentIndex = 0;

  nextValue() {
    this.currentIndex = (this.currentIndex + 1) % this.values.length;
  }

  prevValue() {
    this.currentIndex = (this.currentIndex - 1 + this.values.length) % this.values.length;
  }
}