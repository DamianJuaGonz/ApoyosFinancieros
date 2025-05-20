import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraTodosComponent } from './cabecera-todos/cabecera-todos.component';
import { FooterComponent } from './footer/footer.component';
import { CreditBannerComponent } from './credit-banner/credit-banner.component';


 
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CabeceraTodosComponent,FooterComponent,CreditBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'landingpage';
}
