import { Component } from '@angular/core';
import { GridBannerComponent } from '../grid-banner/grid-banner.component';
import { ProductShowcaseComponent } from '../product-showcase/product-showcase.component';
import { ValuesCarouselComponent } from '../values-carousel/values-carousel.component';
import { OrgChartPlaceholderComponent } from '../org-chart-placeholder/org-chart-placeholder.component';

@Component({
  selector: 'app-nosotros',
  imports: [GridBannerComponent,ProductShowcaseComponent,ValuesCarouselComponent,OrgChartPlaceholderComponent],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {

  customValues = {
  title: "Nuestros Principios",
  items: [
    {
      title: "Compromiso",
      image: 'img/image53.png',
      description: "Estamos dedicados a brindar soluciones financieras que realmente marquen la diferencia en la vida de nuestros clientes."
    },
    {
      title: "Sostenibilidad",
      image: 'img/image53.png',
      description: "Implementamos prácticas responsables que benefician a nuestros clientes, comunidades y el medio ambiente."
    },
    {
      title: "Colaboración",
      image: 'img/image53.png',
      description: "Trabajamos en equipo y con nuestros clientes para lograr resultados excepcionales."
    }
  ]
};


  mainBanner = {
    title: 'SOBRE NOSOTROS',
    description: '',
    image: 'img/image51.png',
    gridColor: '#8DBBD6'
  };


  productData = {
  name: "¿Quienes somos?",
  sobrenosotro: "Conoce mas de nosotros",
  items: [
    {
      image: 'img/image50.png',
      title: 'Tarjeta de Crédito Platinum',
      description: 'Disfruta de beneficios exclusivos con nuestra tarjeta platinum. Tasa preferencial del 15% anual, seguros incluidos, acceso a salas VIP en aeropuertos y hasta 50 días sin intereses. Aceptada en millones de establecimientos a nivel mundial.'
    },
    {
      image: 'img/image49.png',
      title: 'Crédito Empresarial',
      description: 'Financiamiento diseñado para hacer crecer tu negocio. Montos desde $50,000 hasta $5,000,000 MXN con plazos de 12 a 60 meses. Tasas competitivas y aprobación en 48 horas. Sin comisión por apertura durante promociones especiales.'
    },
    {
      image: 'img/image482.png',
      title: 'Hipoteca Verde',
      description: 'Adquiere tu vivienda con nuestra hipoteca ecológica que incluye beneficios adicionales para hogares sustentables. Financiamiento hasta el 90% del valor de la propiedad con tasas desde 8.5% anual. Plazos de 5 a 20 años adaptables a tus necesidades.'
    }
  ]
};

}
