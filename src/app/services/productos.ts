import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interfaz que define la estructura de un producto
 */
export interface Producto {
  /** Identificador único del producto */
  id?: number;
  /** Nombre del producto */
  nombre: string;
  /** Precio actual del producto */
  precio: number;
  /** Precio original antes del descuento */
  precioOriginal: number;
  /** Ruta de la imagen del producto */
  img: string;
  /** Texto del descuento si aplica */
  descuento: string;
  /** Descripción del producto */
  descripcion: string;
  /** Categoría del producto: carta, mesa, rol o cooperativo */
  categoria: string;
}

/**
 * Servicio para gestionar los productos de Ludomaniacos
 * Consume la API REST de JSON Server con métodos GET, POST, PUT y DELETE
 */
@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  /** URL base de la API de JSON Server */
  private apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los productos disponibles
   * @returns Observable con la lista completa de productos
   */
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  /**
   * Obtiene los productos filtrados por categoría
   * @param categoria Categoría a filtrar: carta, mesa, rol o cooperativo
   * @returns Observable con la lista de productos de esa categoría
   */
  getProductosPorCategoria(categoria: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}?categoria=${categoria}`);
  }

  /**
   * Obtiene un producto específico por su ID
   * @param id Identificador único del producto
   * @returns Observable con el producto encontrado
   */
  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  /**
   * Agrega un nuevo producto al JSON Server
   * @param producto Objeto con los datos del nuevo producto
   * @returns Observable con el producto creado
   */
  agregarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  /**
   * Edita un producto existente por su ID
   * @param id Identificador único del producto a editar
   * @param producto Objeto con los nuevos datos del producto
   * @returns Observable con el producto actualizado
   */
  editarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  /**
   * Elimina un producto por su ID
   * @param id Identificador único del producto a eliminar
   * @returns Observable vacío al completarse
   */
  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
