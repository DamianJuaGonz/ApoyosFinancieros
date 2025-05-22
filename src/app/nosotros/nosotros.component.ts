import { Component } from '@angular/core';
import { GridBannerComponent } from '../grid-banner/grid-banner.component';
import { ProductShowcaseComponent } from '../product-showcase/product-showcase.component';

@Component({
  selector: 'app-nosotros',
  imports: [GridBannerComponent,ProductShowcaseComponent],
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


  productData = {
  name: "Nuestros Productos Financieros",
  items: [
    {
      image: 'assets/products/credit-card.jpg',
      title: 'Tarjeta de Crédito Platinum',
      description: 'Disfruta de beneficios exclusivos con nuestra tarjeta platinum. Tasa preferencial del 15% anual, seguros incluidos, acceso a salas VIP en aeropuertos y hasta 50 días sin intereses. Aceptada en millones de establecimientos a nivel mundial.'
    },
    {
      image: 'assets/products/business-loan.jpg',
      title: 'Crédito Empresarial',
      description: 'Financiamiento diseñado para hacer crecer tu negocio. Montos desde $50,000 hasta $5,000,000 MXN con plazos de 12 a 60 meses. Tasas competitivas y aprobación en 48 horas. Sin comisión por apertura durante promociones especiales.'
    },
    {
      image: 'assets/products/mortgage.jpg',
      title: 'Hipoteca Verde',
      description: 'Adquiere tu vivienda con nuestra hipoteca ecológica que incluye beneficios adicionales para hogares sustentables. Financiamiento hasta el 90% del valor de la propiedad con tasas desde 8.5% anual. Plazos de 5 a 20 años adaptables a tus necesidades.'
    }
  ]
};

}
