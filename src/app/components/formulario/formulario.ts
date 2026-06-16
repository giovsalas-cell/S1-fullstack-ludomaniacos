import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports: [FormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  nombre: string = '';
  nombreUsuario: string = '';
  correo: string = '';
  password: string = '';
  passwordRepeat: string = '';
  fechaNacimiento: string = '';
  direccion: string = '';
}
