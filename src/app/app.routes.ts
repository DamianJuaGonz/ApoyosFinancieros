import { Routes } from '@angular/router';
import { UneteComponent } from './unete/unete.component';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RequisitosComponent } from './requisitos/requisitos.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { CreditosComponent } from './creditos/creditos.component';
import { CreditApplicationComponent } from './credit-application/credit-application.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';  
import { ApiTestComponent } from './api-test/api-test.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent}, // Ruta principal
{ path: 'unete', component: UneteComponent }, // Ruta para Únete
{ path: 'requisitos', component: RequisitosComponent }, // Ruta para Únete
{ path: 'nosotros', component: NosotrosComponent }, // Ruta para Únete


{ path: 'credito6', component: CreditosComponent }, // Ruta para Únete




{ path: 'credito-grupal', component: CreditosComponent,data: { tipo: 'grupal' } } ,
{ path: 'credito-personal', component: CreditosComponent,data: { tipo: 'personal' } } ,


{ path: 'credito-de-nomina', component: CreditosComponent,data: { tipo: 'flujo' } } ,
{ path: 'credito-incremento', component: CreditosComponent,data: { tipo: 'incremento' } } ,
{ path: 'credito-comercial', component: CreditosComponent,data: { tipo: 'comercial' } } ,
{ path: 'credito-consumo', component: CreditosComponent,data: { tipo: 'consumo' } } ,

{ path: 'admin', component: ApiTestComponent },

{ path: 'formulario', component: CreditApplicationComponent }, // Ruta para Únete
];
