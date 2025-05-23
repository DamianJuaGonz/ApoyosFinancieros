import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-cabecera-todos',
  imports: [CommonModule,RouterModule],
  templateUrl: './cabecera-todos.component.html',
  styleUrl: './cabecera-todos.component.scss'
})
export class CabeceraTodosComponent {
  menuItems = [
    { title: 'Clientes', path: '/clientes' },
    { title: 'Nosotros', path: '/nosotros' },
    { title: 'Requisitos', path: '/requisitos' },
    { title: 'Únete', path: '/unete' }
  ];
}