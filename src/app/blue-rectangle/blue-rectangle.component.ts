import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blue-rectangle',
  imports: [],
  templateUrl: './blue-rectangle.component.html',
  styleUrl: './blue-rectangle.component.css'
})
export class BlueRectangleComponent {
  @Input() text: string = "Texto dinámico aquí"; // Texto recibido desde el padre
  @Input() backgroundColor: string = "#1976d2"; // Color azul por defecto, pero configurable
}
