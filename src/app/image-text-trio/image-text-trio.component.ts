import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-text-trio',
  imports: [CommonModule],
  templateUrl: './image-text-trio.component.html',
  styleUrl: './image-text-trio.component.css'
})


export class ImageTextTrioComponent {
  /*items = [
    {
      image: 'https://i.ibb.co/qY1cGN8C/image-32.png',
      altText: 'Descripción imagen 1',
      title: '',
      text: 'Texto descriptivo bajo la primera imagen. Puede ser más largo si es necesario.'
    },
    {
      image: 'https://i.ibb.co/qY1cGN8C/image-32.png',
      altText: 'Descripción imagen 2',
      title: '',
      text: 'Texto descriptivo bajo la segunda imagen. Adaptado al diseño.'
    },
    {
      image: 'https://i.ibb.co/qY1cGN8C/image-32.png',
      altText: 'Descripción imagen 3',
      title: '',
      text: 'Tercer texto descriptivo, completando el trío de elementos visuales.'
    }
  ];*/
    @Input() items: Array<{
    image: string;
    altText: string;
    title: string;
    text: string;
  }> = []; // Valor por defecto array vacío
}
