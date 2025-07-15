import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 

@Component({
  selector: 'app-api-test',
  imports: [FormsModule,CommonModule],
  templateUrl: './api-test.component.html',
  styleUrls: ['./api-test.component.css']
})
export class ApiTestComponent implements OnInit {
  testResults: any = {};
  loading = false;
  loginData = { username: '', password: '' };
  solicitudData = {
    datos_personales: {
      nombre: 'Juan',
      apellidoPaterno: 'Pérez',
      // ... otros campos según tu estructura
    },
    // ... otros datos necesarios
  };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.runTests();
  }

  runTests(): void {
    this.loading = true;
    this.testResults = {};

    // 1. Prueba de Login
    this.testLogin();
  }

  testLogin(): void {
    this.apiService.login(this.loginData.username, this.loginData.password).subscribe({
      next: (response) => {
        this.testResults.login = { success: true, message: 'Login exitoso', data: response };
        this.testCreateSolicitud();
      },
      error: (error) => {
        this.testResults.login = { success: false, message: 'Error en login', error };
        this.loading = false;
      }
    });
  }

  testCreateSolicitud(): void {
    this.apiService.crearSolicitud(this.solicitudData).subscribe({
      next: (response) => {
        this.testResults.createSolicitud = { success: true, message: 'Solicitud creada', data: response };
        this.testGetSolicitudes();
      },
      error: (error) => {
        this.testResults.createSolicitud = { success: false, message: 'Error al crear solicitud', error };
        this.loading = false;
      }
    });
  }

  testGetSolicitudes(): void {
    this.apiService.obtenerSolicitudes().subscribe({
      next: (response) => {
        this.testResults.getSolicitudes = { success: true, message: 'Solicitudes obtenidas', data: response };
        this.loading = false;
      },
      error: (error) => {
        this.testResults.getSolicitudes = { success: false, message: 'Error al obtener solicitudes', error };
        this.loading = false;
      }
    });
  }

  submitLogin(): void {
    this.runTests();
  }
}