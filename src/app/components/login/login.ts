import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Autenticar } from '../../services/autenticar';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  formulario: FormGroup;
  errorLogin = false;
  constructor(
    private fb: FormBuilder,
    private autenticar: Autenticar,
    private router: Router,
  ) {
    this.formulario = this.fb.group({
      nombreUsuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ingresar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const nombreUsuario = this.formulario.value.nombreUsuario;
    const password = this.formulario.value.password;
    const ok = this.autenticar.login(nombreUsuario, password);

    if (ok) {
      if (this.autenticar.esAdmin()) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.errorLogin = true;
    }
  }
  irARecuperar() {
    this.router.navigate(['/recuperar']);
  }
}
