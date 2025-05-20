import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraTodosComponent } from './cabecera-todos/cabecera-todos.component';
import { FooterComponent } from './footer/footer.component';
import { CreditBannerComponent } from './credit-banner/credit-banner.component';
import { ProductsSectionComponent } from './products-section/products-section.component';


 
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CabeceraTodosComponent,FooterComponent,CreditBannerComponent,ProductsSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'landingpage';
}
