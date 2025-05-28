import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreditService } from '../services/credit.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { RouterModule } from '@angular/router';

  
@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
  , standalone: true
})
export class AdminPanelComponent {
  solicitudes: any[] = [];
  solicitudesAprobadas: any[] = [];

  
  isLoggedIn = false;/*
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
*/
loginForm: FormGroup;

  constructor(
    private creditService: CreditService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Inicialización del formulario en el constructor
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Verificar si ya está logueado
    const token = localStorage.getItem('adminToken');
    if (token) {
      this.isLoggedIn = true;
      this.cargarSolicitudes();
    }
  }

 login() {
    if (this.loginForm.valid) {
      // Uso de ! para indicar que sabemos que no son null/undefined
      const username = this.loginForm.get('username')!.value;
      const password = this.loginForm.get('password')!.value;
      
      this.creditService.login(username, password).subscribe({
        next: (admins) => {
          if (admins && admins.length > 0) {
            this.isLoggedIn = true;
            localStorage.setItem('adminToken', 'loggedIn');
            this.cargarSolicitudes();
          } else {
            alert('Credenciales incorrectas');
          }
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          alert('Error al iniciar sesión');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  cargarSolicitudes() {
    this.creditService.obtenerSolicitudes().subscribe({
      next: (solicitudes) => {
        this.solicitudes = solicitudes;
      },
      error: (err) => {
        console.error('Error al cargar solicitudes:', err);
      }
    });

    this.creditService.obtenerSolicitudesAprobadas().subscribe({
      next: (aprobadas) => {
        this.solicitudesAprobadas = aprobadas;
      },
      error: (err) => {
        console.error('Error al cargar solicitudes aprobadas:', err);
      }
    });
  }

  aprobarSolicitud(id: number) {
    this.creditService.aprobarSolicitud(id).subscribe({
      next: () => {
        alert('Solicitud aprobada');
        this.cargarSolicitudes();
      },
      error: (err) => {
        console.error('Error al aprobar solicitud:', err);
        alert('Error al aprobar solicitud');
      }
    });
  }

  rechazarSolicitud(id: number) {
    this.creditService.rechazarSolicitud(id).subscribe({
      next: () => {
        alert('Solicitud rechazada');
        this.cargarSolicitudes();
      },
      error: (err) => {
        console.error('Error al rechazar solicitud:', err);
        alert('Error al rechazar solicitud');
      }
    });
  }

  logout() {
    localStorage.removeItem('adminToken');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}