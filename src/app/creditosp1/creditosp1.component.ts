import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-creditosp1',
  imports: [CommonModule],
  templateUrl: './creditosp1.component.html',
  styleUrl: './creditosp1.component.css'
})
export class Creditosp1Component {
  @Input() title: string = "Título principal";
  @Input() description: string = "Descripción del contenido principal";
  @Input() aquaBoxText: string = "Texto en caja aqua";
  @Input() navyBoxText: string = "Texto en caja azul marino";
  @Input() whiteSectionText: string = "Texto en la sección blanca";
  @Input() rightImages: string[] = [
    'assets/image1.jpg',
    'assets/image2.jpg'
  ];
}