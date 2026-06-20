import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  imports: [RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  productos: any[] = [];

  constructor(private carritoService: CarritoService) {
    this.productos = this.carritoService.obtener();
  }

  eliminar(nombre: string) {
    this.carritoService.eliminar(nombre);
    this.productos = this.carritoService.obtener();
  }

  limpiar() {
    this.carritoService.limpiar();
    this.productos = this.carritoService.obtener();
  }

  total() {
    return this.carritoService.total();
  }
}
