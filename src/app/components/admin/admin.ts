import { Component } from '@angular/core';
import { Autenticar, Usuario } from '../../services/autenticar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  usuario: Usuario | null;

  constructor(
    private autenticar: Autenticar,
    private router: Router,
  ) {
    this.usuario = this.autenticar.usuarioActual();
  }

  cerrarSesion() {
    this.autenticar.logout();
    this.router.navigate(['/']);
  }
}
