import { Component } from '@angular/core';
import { GridBannerComponent } from '../grid-banner/grid-banner.component';

@Component({
  selector: 'app-nosotros',
  imports: [GridBannerComponent],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {
  mainBanner = {
    title: 'SOBRE NOSOTROS',
    description: '',
    image: 'img/image51.png',
    gridColor: '#8DBBD6'
  };
}
