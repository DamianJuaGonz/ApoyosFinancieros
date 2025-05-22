import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-split-content',
  imports: [CommonModule],
  templateUrl: './split-content.component.html',
  styleUrl: './split-content.component.css'
})
export class SplitContentComponent {
  @Input() mainTitle: string = 'Título Principal Derecho';
  @Input() leftTitle: string = 'Título Sección Izquierda';
  @Input() rightTitle: string = 'Título Sección Derecha';
  @Input() leftItems: string[] = ['Item 1', 'Item 2', 'Item 3'];
  @Input() rightItems: string[] = ['Item A', 'Item B', 'Item C'];
  @Input() footerText: string = 'Texto final centrado al pie del componente';
}