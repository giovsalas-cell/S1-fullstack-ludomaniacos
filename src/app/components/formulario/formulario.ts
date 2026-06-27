import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Autenticar } from '../../services/autenticar';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

// Funciones validadoras

function tieneMayuscula(control: AbstractControl): ValidationErrors | null {
  if (/[A-Z]/.test(control.value)) {
    return null;
  }
  return { sinMayuscula: true };
}

function tieneNumero(control: AbstractControl): ValidationErrors | null {
  if (/[0-9]/.test(control.value)) {
    return null;
  }
  return { sinNumero: true };
}

function verificarEdad(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return { required: true };
  const hoy = new Date();
  const nacimiento = new Date(control.value);
  const edad = hoy.getFullYear() - nacimiento.getFullYear();
  if (edad >= 13) {
    return null;
  }
  return { menorDe13: true };
}

function passwordsIguales(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmar = control.get('confirmarPassword')?.value;
  if (password === confirmar) {
    return null;
  }
  return { noCoinciden: true };
}

// Componente

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  formulario: FormGroup;
  hoy = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private autenticar: Autenticar,
    private router: Router,
  ) {
    this.formulario = this.fb.group(
      {
        nombre: ['', Validators.required],
        nombreUsuario: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(18),
            tieneMayuscula,
            tieneNumero,
          ],
        ],
        confirmarPassword: ['', Validators.required],
        fechaNacimiento: ['', [Validators.required, verificarEdad]],
        direccion: [''],
      },
      { validators: passwordsIguales },
    );
  }

  mensajeError: string = '';

  enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const exito = this.autenticar.registrar(this.formulario.value);

    if (exito) {
      alert('Registro exitoso! Ahora puedes iniciar sesión.');
      this.router.navigate(['/login']);
    } else {
      this.mensajeError = 'El correo ya está registrado.';
    }
  }

  limpiar() {
    this.formulario.reset();
    this.mensajeError = '';
  }
}
