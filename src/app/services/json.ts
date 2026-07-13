import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './modelo';

/**
 * Servicio que consume los archivos JSON desde GitHub Pages
 */
@Injectable({
  providedIn: 'root',
})
export class JsonService {
  /** URL base del repositorio JSON en GitHub Pages */
  private baseUrl = 'https://giovsalas-cell.github.io/json-repository';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los productos de tipo carta
   * @returns Observable con lista de productos carta
   */
  getCarta(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/carta.json`);
  }

  /**
   * Obtiene los productos de tipo mesa
   * @returns Observable con lista de productos mesa
   */
  getMesa(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/mesa.json`);
  }

  /**
   * Obtiene los productos de tipo rol
   * @returns Observable con lista de productos rol
   */
  getRol(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/rol.json`);
  }

  /**
   * Obtiene los productos de tipo cooperativo
   * @returns Observable con lista de productos cooperativo
   */
  getCooperativo(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/cooperativo.json`);
  }

  /**
   * Obtiene los juegos en preventa desde GitHub Pages
   * @returns Observable con lista de preventas
   */
  getPreventas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/preventas.json`);
  }
}
