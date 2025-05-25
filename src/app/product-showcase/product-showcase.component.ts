import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-showcase',
  imports: [CommonModule],
  templateUrl: './product-showcase.component.html',
  styleUrl: './product-showcase.component.css'
})
export class ProductShowcaseComponent {

@Input() productName: string = "Product name";
  @Input() sobrenosotros: string= "Conoce mas de nosotros";
  @Input() products = [
    {
      image: 'assets/images/product1.jpg',
      title: 'Título Producto 1',
      description: 'Descripción detallada del primer producto. Este texto es más largo y puede contener varias líneas de información sobre las características y beneficios del producto ofrecido.'
    },
    {
      image: 'assets/images/product2.jpg',
      title: 'Título Producto 2',
      description: 'Descripción detallada del segundo producto. Esta información extensa describe todos los aspectos relevantes que el cliente necesita conocer antes de tomar una decisión de compra.'
    },
    {
      image: 'assets/images/product3.jpg',
      title: 'Título Producto 3',
      description: 'Descripción completa del tercer producto. Incluye detalles técnicos, beneficios y cualquier otra información que pueda ser relevante para los potenciales compradores.'
    }
  ];
}
