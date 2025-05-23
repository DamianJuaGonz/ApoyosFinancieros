import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-creditosp3',
  imports: [],
  templateUrl: './creditosp3.component.html',
  styleUrl: './creditosp3.component.css'
})
export class Creditosp3Component {
  @Input() grayBlockText: string = "Nota: En este préstamo se avalan entre todas las solicitantes, firmando una hoja compromiso de pagare grupal, donde todas se comprometen a pagar en caso de que alguna quede mal.";
  @Input() blueBlockText: string = "Rellena la solicitud en linea";
  @Input() spaceHeight: string = "50px"; // Altura de los espacios en blanco
  @Input() spaceHeight2: string = "100px"; // Altura de los espacios en blanco
}