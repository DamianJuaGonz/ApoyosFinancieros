import { Routes } from '@angular/router';
import { UneteComponent } from './unete/unete.component';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RequisitosComponent } from './requisitos/requisitos.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { CreditosComponent } from './creditos/creditos.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent}, // Ruta principal
{ path: 'unete', component: UneteComponent }, // Ruta para Únete
{ path: 'requisitos', component: RequisitosComponent }, // Ruta para Únete
{ path: 'nosotros', component: NosotrosComponent }, // Ruta para Únete
{ path: 'credito6', component: CreditosComponent }, // Ruta para Únete

];
