import { Injectable } from '@angular/core';

/**
 * Servicio del carrito de compras de Ludomaniacos
 * Persiste los productos en localStorage para mantenerlos al recargar la página
 */
@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  /** Clave usada para guardar el carrito en localStorage */
  private readonly KEY = 'carrito_ludomaniacos';

  /** Array de productos en el carrito cargado desde localStorage */
  private productos: any[] = [];

  constructor() {
    // cargar carrito desde localStorage al iniciar
    this.cargarDesdeStorage();
  }

  /**
   * Carga los productos del carrito desde localStorage
   */
  private cargarDesdeStorage() {
    const data = localStorage.getItem(this.KEY);
    this.productos = data ? JSON.parse(data) : [];
  }

  /**
   * Guarda el estado actual del carrito en localStorage
   */
  private guardarEnStorage() {
    localStorage.setItem(this.KEY, JSON.stringify(this.productos));
  }

  /**
   * Agrega un producto al carrito
   * Si ya existe incrementa la cantidad en 1
   * @param producto Producto a agregar
   */
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
    this.guardarEnStorage();
  }

  /**
   * Obtiene todos los productos del carrito
   * @returns Lista de productos en el carrito
   */
  obtener() {
    return this.productos;
  }

  /**
   * Elimina un producto del carrito por su nombre
   * @param nombre Nombre del producto a eliminar
   */
  eliminar(nombre: string) {
    this.productos = this.productos.filter((p) => p.nombre !== nombre);
    this.guardarEnStorage();
  }

  /**
   * Vacía completamente el carrito y limpia localStorage
   */
  limpiar() {
    this.productos = [];
    this.guardarEnStorage();
  }

  /**
   * Calcula el total del carrito
   * @returns Suma de precio por cantidad de cada producto
   */
  total() {
    return this.productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  }
}
