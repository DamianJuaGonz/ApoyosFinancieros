import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-creditosp2',
  imports: [CommonModule],
  templateUrl: './creditosp2.component.html',
  styleUrl: './creditosp2.component.css'
})
export class Creditosp2Component {
  @Input() title: string = "Conoce mas sobre este credito";
  @Input() backgroundImage: string = "img/image55.png";
  
  @Input() leftBox = {
    title: "Requisitos",
    items: [
      "Identificación Oficial, INE. (vigente)", 
      "Comprobante domiciliario no mayor a 3 meses de actualización.", 
      "Deposito en garantia.", 
      "Internamente se debe realizar todo el procedimiento que se lleva a cabo para autorizar los créditos en trámite."
    ]
  };
  
  @Input() rightBox = {
    title: "Condiciones",
    items: [
      "Tener negocio propio o actividad laboral comprobable.", 
      "Ser verificada en domicilio y actividad.", 
      "Tener compromiso de ahorrar cada semana para favorecer el incremento del monto de su préstamo, monto mínimo de 20 pesos en adelante.",
       "El número de integrantes permitido es de 6 a máximo 10 integrantes."
    ]
  };
}