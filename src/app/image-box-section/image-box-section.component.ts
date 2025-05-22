import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-box-section',
  imports: [CommonModule],
  templateUrl: './image-box-section.component.html',
  styleUrl: './image-box-section.component.css'
})
export class ImageBoxSectionComponent {
  @Input() title: string = "Título de la sección";
  
  @Input() topItems: Array<{
    image: string,
    text: string
  }> = [
    { image: 'assets/icon1.png', text: 'Texto 1' },
    { image: 'assets/icon2.png', text: 'Texto 2' },
    { image: 'assets/icon3.png', text: 'Texto 3' }
  ];

  @Input() bottomItems: Array<{
    image: string,
    text: string
  }> = [
    { image: 'assets/icon4.png', text: 'Texto 4' },
    { image: 'assets/icon5.png', text: 'Texto 5' }
  ];
}