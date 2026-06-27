import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Autenticar } from '../../services/autenticar';

function passwordsIguales(control: AbstractControl): ValidationErrors | null {
  const password = control.get('nuevaPassword')?.value;
  const confirmar = control.get('confirmarPassword')?.value;
  if (password === confirmar) return null;
  return { noCoinciden: true };
}

function tieneMayuscula(control: AbstractControl): ValidationErrors | null {
  if (/[A-Z]/.test(control.value)) return null;
  return { sinMayuscula: true };
}

function tieneNumero(control: AbstractControl): ValidationErrors | null {
  if (/[0-9]/.test(control.value)) return null;
  return { sinNumero: true };
}

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recuperar.html',
  styleUrl: './recuperar.css',
})
export class Recuperar {
  formulario: FormGroup;
  mensajeError: string = '';
  mensajeExito: string = '';

  constructor(
    private fb: FormBuilder,
    private autenticar: Autenticar,
    private router: Router,
  ) {
    this.formulario = this.fb.group(
      {
        correo: ['', [Validators.required, Validators.email]],
        nuevaPassword: [
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
      },
      { validators: passwordsIguales },
    );
  }

  recuperar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const exito = this.autenticar.recuperarPassword(
      this.formulario.value.correo,
      this.formulario.value.nuevaPassword,
    );

    if (exito) {
      this.mensajeExito = 'Contraseña actualizada exitosamente!';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } else {
      this.mensajeError = 'El correo no está registrado.';
    }
  }

  limpiar() {
    this.formulario.reset();
    this.mensajeError = '';
    this.mensajeExito = '';
  }
  irALogin() {
    this.router.navigate(['/login']);
  }
}
