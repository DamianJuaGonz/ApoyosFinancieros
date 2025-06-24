import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cabecera-todos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cabecera-todos.component.html',
  styleUrl: './cabecera-todos.component.scss'
})
export class CabeceraTodosComponent {
  menuItems = [
    { title: 'Clientes', path: '/admin' },
    { title: 'Nosotros', path: '/nosotros' },
    { title: 'Requisitos', path: '/requisitos' },
    { title: 'Únete', path: '/unete' }
  ];

  searchTerm: string = '';
  showSuggestions: boolean = false;
  filteredItems: any[] = [];
  private hideSuggestionsTimeout: any;

  constructor(private router: Router) {}

  onSearchInput() {
    if (this.searchTerm.trim().length > 0) {
      this.filteredItems = this.menuItems.filter(item =>
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.showSuggestions = true;
    } else {
      this.filteredItems = [];
      this.showSuggestions = false;
    }
  }

  selectItem(item: any) {
    this.router.navigate([item.path]);
    this.searchTerm = '';
    this.showSuggestions = false;
    clearTimeout(this.hideSuggestionsTimeout);
  }

  onSearchClick() {
    if (this.filteredItems.length > 0) {
      this.selectItem(this.filteredItems[0]);
    }
  }

  // Método actualizado para manejar correctamente el tipo de evento
  onKeyPress(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter' && this.filteredItems.length > 0) {
      this.selectItem(this.filteredItems[0]);
    }
  }

  onFocus() {
    if (this.searchTerm) {
      this.showSuggestions = true;
    }
  }

  onBlur() {
    this.hideSuggestionsTimeout = setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }
}