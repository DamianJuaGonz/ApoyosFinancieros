import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grid-banner',
  imports: [],
  templateUrl: './grid-banner.component.html',
  styleUrl: './grid-banner.component.css'
})
export class GridBannerComponent {
 
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Input() gridColor: string = '#1565C0'; // Color de la rejilla
  @Input() gridOpacity: number = 0.2; // Opacidad de la rejilla (0 a 1)
  @Input() textColor: string = 'white'; // Color del texto
}