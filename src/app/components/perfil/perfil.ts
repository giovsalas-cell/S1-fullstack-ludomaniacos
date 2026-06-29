import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Autenticar } from '../../services/autenticar';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  formulario: FormGroup;
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private autenticar: Autenticar,
    private router: Router,
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      direccion: [''],
    });
  }

  ngOnInit() {
    const usuario = this.autenticar.usuarioActual();
    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }
    this.formulario.patchValue({
      nombre: usuario.nombre,
      nombreUsuario: usuario.nombreUsuario,
      correo: usuario.correo,
      direccion: usuario.direccion,
    });
  }

  guardar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const exito = this.autenticar.actualizarPerfil(this.formulario.value);

    if (exito) {
      this.mensajeExito = 'Perfil actualizado exitosamente!';
      this.mensajeError = '';
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1500);
    } else {
      this.mensajeError = 'El correo ya está en uso por otro usuario.';
      this.mensajeExito = '';
    }
  }
}
