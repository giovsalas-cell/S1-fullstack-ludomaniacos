import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private productos: any[] = [];

  agregar(producto: any) {
    const existe = this.productos.find((p) => p.nombre === producto.nombre);
    if (existe) {
      existe.cantidad++;
    } else {
      this.productos.push({
        nombre: producto.nombre,
        precio: producto.precio,
        img: producto.img,
        descripcion: producto.descripcion,
        descuento: producto.descuento,
        precioOriginal: producto.precioOriginal,
        cantidad: 1,
      });
    }
  }
  obtener() {
    return this.productos;
  }

  eliminar(nombre: string) {
    this.productos = this.productos.filter((p) => p.nombre !== nombre);
  }

  limpiar() {
    this.productos = [];
  }

  total() {
    return this.productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  }
}
