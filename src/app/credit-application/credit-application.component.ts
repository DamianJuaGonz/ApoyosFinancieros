import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-credit-application',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './credit-application.component.html',
  styleUrl: './credit-application.component.css'
})
export class CreditApplicationComponent {
  
  creditForm: FormGroup;
  profileImage: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.creditForm = this.fb.group({
      // Datos personales
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      curp: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}\d{6}[HM][A-Z]{5}\d{2}$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      vivienda: ['', Validators.required],
      calle: ['', Validators.required],
      numero: ['', Validators.required],
      colonia: ['', Validators.required],
      localidad: ['', Validators.required],
      cp: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      estado: ['', Validators.required],
      conyuge: [''],
      hijos: ['0', [Validators.required, Validators.min(0)]],
      vehiculo: [''],
      
      // Datos laborales
      direccionTrabajo: ['', Validators.required],
      puesto: ['', Validators.required],
      antiguedad: ['', [Validators.required, Validators.min(0)]],
      telefonoTrabajo: ['', Validators.pattern(/^\d{10}$/)],
      
      // Datos del préstamo
      monto: ['', [Validators.required, Validators.min(1000)]],
      plazo: ['', [Validators.required, Validators.min(1)]],
      proposito: ['']
    });
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.creditForm.valid) {
      console.log('Formulario enviado:', this.creditForm.value);
      // Aquí iría la lógica para enviar el formulario
    } else {
      console.log('Formulario inválido');
    }
  }
}