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
      title: 'Misión',
      description: 'Proporcionar soluciones integrales seguras y confiables del sistema Financiero y de seguros protegiendo los patrimonios de cada una de maestros clientes brindando asesoria, confianza y un servicio de calidad.'
    },
    {
      image: 'img/image49.png',
      title: 'Visión',
      description: 'Ser reconocidos y convertirnos en la primera opción para el asesoramien y contratación de productos financieros, dentacando por la excelencia de servicios, la innovación constante y la satisfacción del cliente.'
    },
    {
      image: 'img/image482.png',
      title: 'Objetivo',
      description: 'Ofrecer soluciones financieras y de seguros seguras y confiables, enfocadas en proteger el patrimonio de nuestros clientes mediante un servicio de calidad y asesoría personalizada.'
    }
  ]
};

}
