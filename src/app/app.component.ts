import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraTodosComponent } from './cabecera-todos/cabecera-todos.component';
import { FooterComponent } from './footer/footer.component';
import { CreditBannerComponent } from './credit-banner/credit-banner.component';
import { ProductsSectionComponent } from './products-section/products-section.component';
import { ImageTextTrioComponent } from './image-text-trio/image-text-trio.component';


 
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CabeceraTodosComponent,FooterComponent,CreditBannerComponent,ProductsSectionComponent,ImageTextTrioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'landingpage';
}
