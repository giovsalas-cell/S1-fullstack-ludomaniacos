import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Autenticar } from './services/autenticar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(
    public autenticar: Autenticar,
    private router: Router,
  ) {}

  cerrarSesion() {
    this.autenticar.logout();
    this.router.navigate(['/']);
  }
  irAPerfil() {
    this.router.navigate(['/perfil']);
  }
}
